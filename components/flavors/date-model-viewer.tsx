"use client";

import { useEffect, useRef, useState } from "react";
import type { Object3D } from "three";

type DateModelViewerProps = {
  modelPath: string;
};

type DisposableMesh = Object3D & {
  isMesh?: boolean;
  geometry?: { dispose: () => void };
  material?: { dispose?: () => void } | Array<{ dispose?: () => void }>;
};

export function DateModelViewer({ modelPath }: DateModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let cleanupScene: (() => void) | null = null;

    async function setupViewer() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const activeCanvas = canvas;

      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

        if (!isMounted) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.22, 5.2);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas: activeCanvas
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const dateGroup = new THREE.Group();
        scene.add(dateGroup);

        const ambient = new THREE.AmbientLight(0xfff7e8, 2.4);
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
        const fillLight = new THREE.DirectionalLight(0xc9a84c, 1.45);
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.7);

        keyLight.position.set(3.8, 4.6, 5.2);
        fillLight.position.set(-4.4, 1.7, 2.2);
        rimLight.position.set(-2.4, 2.8, -4.6);
        scene.add(ambient, keyLight, fillLight, rimLight);

        function resize() {
          const parent = activeCanvas.parentElement;

          if (!parent) {
            return;
          }

          const { width, height } = parent.getBoundingClientRect();
          const safeWidth = Math.max(1, width);
          const safeHeight = Math.max(1, height);

          renderer.setSize(safeWidth, safeHeight, false);
          camera.aspect = safeWidth / safeHeight;
          camera.updateProjectionMatrix();
        }

        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(activeCanvas);

        const loader = new GLTFLoader();
        loader.load(
          modelPath,
          (gltf: { scene: Object3D }) => {
            if (!isMounted) {
              return;
            }

            const model = gltf.scene;
            const bounds = new THREE.Box3().setFromObject(model);
            const center = bounds.getCenter(new THREE.Vector3());
            const size = bounds.getSize(new THREE.Vector3());
            const largestSide = Math.max(size.x, size.y, size.z) || 1;
            const scale = 2.55 / largestSide;

            model.position.sub(center);
            model.scale.setScalar(scale);
            model.rotation.set(-0.08, -0.35, 0.05);
            dateGroup.add(model);
            setHasError(false);
          },
          undefined,
          () => {
            if (isMounted) {
              setHasError(true);
            }
          }
        );

        function animate() {
          frameId = window.requestAnimationFrame(animate);
          dateGroup.rotation.y += 0.008;
          dateGroup.rotation.x = Math.sin(Date.now() * 0.00065) * 0.035;
          renderer.render(scene, camera);
        }

        animate();

        cleanupScene = () => {
          window.cancelAnimationFrame(frameId);
          resizeObserver?.disconnect();

          dateGroup.traverse((object) => {
            const mesh = object as DisposableMesh;

            if (!mesh.isMesh) {
              return;
            }

            mesh.geometry?.dispose();

            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => material.dispose?.());
            } else {
              mesh.material?.dispose?.();
            }
          });

          renderer.dispose();
        };
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    setupViewer();

    return () => {
      isMounted = false;
      cleanupScene?.();
    };
  }, [modelPath]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Modèle 3D de datte en rotation"
      />
      {hasError ? (
        <div className="absolute inset-0 grid place-items-center rounded-[2rem] border border-gold/20 bg-cream/55 px-6 text-center text-sm font-semibold text-date">
          Le modèle 3D est temporairement indisponible.
        </div>
      ) : null}
    </div>
  );
}
