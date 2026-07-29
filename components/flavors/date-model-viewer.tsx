"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Group,
  Material,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";

type DateModelViewerProps = {
  modelPath: string;
  flavorName: string;
  onModelReady?: () => void;
};

type MaterialState = {
  material: Material;
  opacity: number;
  transparent: boolean;
  depthWrite: boolean;
};

type ModelInstance = {
  object: Object3D;
  materials: MaterialState[];
  baseScale: number;
};

type ModelTransition = {
  from: ModelInstance | null;
  to: ModelInstance;
  startedAt: number;
  duration: number;
};

type ViewerRuntime = {
  THREE: typeof import("three");
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  dateGroup: Group;
  currentModel: ModelInstance | null;
  transition: ModelTransition | null;
};

const modelCache = new Map<string, Promise<Object3D>>();

function loadModelTemplate(modelPath: string) {
  const cachedModel = modelCache.get(modelPath);

  if (cachedModel) {
    return cachedModel;
  }

  const modelRequest = Promise.all([
    import("three/examples/jsm/loaders/GLTFLoader.js"),
    import("three/examples/jsm/libs/meshopt_decoder.module.js")
  ]).then(
    ([{ GLTFLoader }, { MeshoptDecoder }]) =>
      new Promise<Object3D>((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.load(modelPath, (gltf) => resolve(gltf.scene), undefined, reject);
      })
  );

  modelCache.set(modelPath, modelRequest);
  void modelRequest.catch(() => modelCache.delete(modelPath));

  return modelRequest;
}

export async function preloadDateModel(modelPath: string) {
  try {
    await loadModelTemplate(modelPath);
  } catch {
    // A foreground load will retry if a background preload fails.
  }
}

function setModelOpacity(instance: ModelInstance, opacity: number, transitioning: boolean) {
  for (const state of instance.materials) {
    const shouldBeTransparent = transitioning || state.transparent || opacity < 0.999;

    state.material.opacity = state.opacity * opacity;
    state.material.depthWrite = transitioning ? false : state.depthWrite;

    if (state.material.transparent !== shouldBeTransparent) {
      state.material.transparent = shouldBeTransparent;
      state.material.needsUpdate = true;
    }
  }
}

function disposeModelInstance(instance: ModelInstance) {
  for (const state of instance.materials) {
    state.material.dispose();
  }
}

function completeTransition(runtime: ViewerRuntime) {
  const transition = runtime.transition;

  if (!transition) {
    return;
  }

  setModelOpacity(transition.to, 1, false);
  transition.to.object.scale.setScalar(transition.to.baseScale);

  if (transition.from) {
    runtime.dateGroup.remove(transition.from.object);
    disposeModelInstance(transition.from);
  }

  runtime.currentModel = transition.to;
  runtime.transition = null;
}

function createModelInstance(runtime: ViewerRuntime, template: Object3D) {
  const model = template.clone(true);
  const materials: MaterialState[] = [];

  model.traverse((child) => {
    const mesh = child as Mesh;

    if (!mesh.isMesh) {
      return;
    }

    const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const clonedMaterials = sourceMaterials.map((material) => material.clone());

    mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];

    for (const material of clonedMaterials) {
      materials.push({
        material,
        opacity: material.opacity,
        transparent: material.transparent,
        depthWrite: material.depthWrite
      });
    }
  });

  const bounds = new runtime.THREE.Box3().setFromObject(model);
  const center = bounds.getCenter(new runtime.THREE.Vector3());
  const size = bounds.getSize(new runtime.THREE.Vector3());
  const largestSide = Math.max(size.x, size.y, size.z) || 1;
  const baseScale = 2.55 / largestSide;

  model.position.sub(center);
  model.scale.setScalar(baseScale * 0.96);
  model.rotation.set(-0.08, -0.35, 0.05);

  const instance = { object: model, materials, baseScale };
  setModelOpacity(instance, 0, true);

  return instance;
}

export function DateModelViewer({
  modelPath,
  flavorName,
  onModelReady
}: DateModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<ViewerRuntime | null>(null);
  const isVisibleRef = useRef(true);
  const onModelReadyRef = useRef(onModelReady);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [hasModel, setHasModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    onModelReadyRef.current = onModelReady;
  }, [onModelReady]);

  useEffect(() => {
    let isMounted = true;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;

    async function setupViewer() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      try {
        const THREE = await import("three");

        if (!isMounted) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.22, 5.2);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas,
          powerPreference: "high-performance"
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
        renderer.setClearColor(0x000000, 0);

        const dateGroup = new THREE.Group();
        scene.add(dateGroup);

        const ambient = new THREE.AmbientLight(0xfff7e8, 2.4);
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
        const fillLight = new THREE.DirectionalLight(0xd4bd91, 1.45);
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.7);

        keyLight.position.set(3.8, 4.6, 5.2);
        fillLight.position.set(-4.4, 1.7, 2.2);
        rimLight.position.set(-2.4, 2.8, -4.6);
        scene.add(ambient, keyLight, fillLight, rimLight);

        runtimeRef.current = {
          THREE,
          scene,
          camera,
          renderer,
          dateGroup,
          currentModel: null,
          transition: null
        };

        const container = canvas.parentElement ?? canvas;

        function resize() {
          const { width, height } = container.getBoundingClientRect();
          const safeWidth = Math.max(1, width);
          const safeHeight = Math.max(1, height);

          renderer.setSize(safeWidth, safeHeight, false);
          camera.aspect = safeWidth / safeHeight;
          camera.updateProjectionMatrix();
        }

        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
          },
          { threshold: 0.05 }
        );
        visibilityObserver.observe(container);

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function animate(now: number) {
          frameId = window.requestAnimationFrame(animate);

          if (!isVisibleRef.current || document.hidden) {
            return;
          }

          const runtime = runtimeRef.current;
          const transition = runtime?.transition;

          if (runtime && transition) {
            const progress = Math.min(1, (now - transition.startedAt) / transition.duration);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            if (transition.from) {
              setModelOpacity(transition.from, 1 - easedProgress, true);
              transition.from.object.scale.setScalar(
                transition.from.baseScale * (1 + easedProgress * 0.025)
              );
            }

            setModelOpacity(transition.to, easedProgress, true);
            transition.to.object.scale.setScalar(
              transition.to.baseScale * (0.96 + easedProgress * 0.04)
            );

            if (progress >= 1) {
              completeTransition(runtime);
            }
          }

          if (!reduceMotion) {
            dateGroup.rotation.y += 0.008;
            dateGroup.rotation.x = Math.sin(now * 0.00065) * 0.035;
          }

          renderer.render(scene, camera);
        }

        frameId = window.requestAnimationFrame(animate);
        setIsViewerReady(true);
      } catch {
        if (isMounted) {
          setIsLoading(false);
          setHasError(true);
        }
      }
    }

    void setupViewer();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();

      const runtime = runtimeRef.current;

      if (runtime) {
        const instances = new Set<ModelInstance>();

        if (runtime.currentModel) {
          instances.add(runtime.currentModel);
        }

        if (runtime.transition?.from) {
          instances.add(runtime.transition.from);
        }

        if (runtime.transition?.to) {
          instances.add(runtime.transition.to);
        }

        instances.forEach(disposeModelInstance);
        runtime.dateGroup.clear();
        runtime.renderer.dispose();
      }

      runtimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const runtime = runtimeRef.current;

    if (!isViewerReady || !runtime) {
      return;
    }

    const activeRuntime = runtime;
    let isCurrentRequest = true;
    setIsLoading(true);
    setHasError(false);

    async function showModel() {
      try {
        const template = await loadModelTemplate(modelPath);

        if (!isCurrentRequest || runtimeRef.current !== activeRuntime) {
          return;
        }

        completeTransition(activeRuntime);

        const previousModel = activeRuntime.currentModel;
        const incomingModel = createModelInstance(activeRuntime, template);

        if (!previousModel) {
          activeRuntime.dateGroup.rotation.set(0, 0, 0);
        } else {
          setModelOpacity(previousModel, 1, true);
        }

        activeRuntime.dateGroup.add(incomingModel.object);
        activeRuntime.transition = {
          from: previousModel,
          to: incomingModel,
          startedAt: performance.now(),
          duration: previousModel ? 340 : 420
        };

        setHasModel(true);
        setIsLoading(false);
        onModelReadyRef.current?.();
      } catch {
        if (isCurrentRequest) {
          const hasVisibleModel = Boolean(
            activeRuntime.currentModel || activeRuntime.transition
          );

          setIsLoading(false);
          setHasError(!hasVisibleModel);
        }
      }
    }

    void showModel();

    return () => {
      isCurrentRequest = false;
    };
  }, [isViewerReady, modelPath]);

  return (
    <div className="relative h-full w-full" aria-busy={isLoading}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          hasModel ? "opacity-100" : "opacity-0"
        }`}
        aria-label={`Modèle 3D de ${flavorName} en rotation`}
      />

      {!hasModel && isLoading ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block size-7 animate-spin rounded-full border-2 border-date/20 border-t-date" />
          <span className="sr-only" role="status">
            Chargement du modèle 3D
          </span>
        </div>
      ) : null}

      {!hasModel && hasError ? (
        <div className="absolute inset-x-5 bottom-5 rounded-full border border-gold/30 bg-cream/90 px-5 py-2 text-center text-sm font-semibold text-date shadow-soft">
          Aperçu 3D temporairement indisponible.
        </div>
      ) : null}
    </div>
  );
}
