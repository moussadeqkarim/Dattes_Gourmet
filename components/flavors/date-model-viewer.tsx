"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type {
  Group,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";

type DateModelViewerProps = {
  modelPath: string;
  posterPath: string;
  flavorName: string;
  onModelReady?: () => void;
};

type ViewerRuntime = {
  THREE: typeof import("three");
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  dateGroup: Group;
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
    // A foreground load will retry and show the matching poster if preloading fails.
  }
}

export function DateModelViewer({
  modelPath,
  posterPath,
  flavorName,
  onModelReady
}: DateModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<ViewerRuntime | null>(null);
  const isVisibleRef = useRef(true);
  const onModelReadyRef = useRef(onModelReady);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
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

        runtimeRef.current = { THREE, scene, camera, renderer, dateGroup };

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
      runtimeRef.current?.renderer.dispose();
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
    setIsModelReady(false);
    setHasError(false);

    async function showModel() {
      try {
        const template = await loadModelTemplate(modelPath);

        if (!isCurrentRequest || runtimeRef.current !== activeRuntime) {
          return;
        }

        const model = template.clone(true);
        const bounds = new activeRuntime.THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new activeRuntime.THREE.Vector3());
        const size = bounds.getSize(new activeRuntime.THREE.Vector3());
        const largestSide = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.55 / largestSide;

        model.position.sub(center);
        model.scale.setScalar(scale);
        model.rotation.set(-0.08, -0.35, 0.05);

        activeRuntime.dateGroup.clear();
        activeRuntime.dateGroup.rotation.set(0, 0, 0);
        activeRuntime.dateGroup.add(model);
        activeRuntime.renderer.render(activeRuntime.scene, activeRuntime.camera);

        setIsModelReady(true);
        onModelReadyRef.current?.();
      } catch {
        if (isCurrentRequest) {
          setHasError(true);
        }
      }
    }

    void showModel();

    return () => {
      isCurrentRequest = false;
    };
  }, [isViewerReady, modelPath]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isModelReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Image
          key={posterPath}
          src={posterPath}
          alt={flavorName}
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          isModelReady ? "opacity-100" : "opacity-0"
        }`}
        aria-label={`Modèle 3D de ${flavorName} en rotation`}
      />

      {!isModelReady && !hasError ? (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
          <span className="block size-7 animate-spin rounded-full border-2 border-date/20 border-t-date" />
          <span className="sr-only" role="status">
            Chargement du modèle 3D
          </span>
        </div>
      ) : null}

      {hasError ? (
        <div className="absolute inset-x-5 bottom-5 rounded-full border border-gold/30 bg-cream/90 px-5 py-2 text-center text-sm font-semibold text-date shadow-soft">
          Aperçu 3D temporairement indisponible.
        </div>
      ) : null}
    </div>
  );
}
