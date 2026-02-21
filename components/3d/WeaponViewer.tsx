'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, Html, useProgress } from '@react-three/drei';
import { Group } from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-military-gold font-mono text-sm">
        LOADING: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function WeaponModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return <primitive ref={ref} object={scene} scale={1} />;
}

interface WeaponViewerProps {
  modelUrl: string;
  weaponName: string;
}

export function WeaponViewer({ modelUrl, weaponName }: WeaponViewerProps) {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <Stage
            environment="warehouse"
            intensity={0.6}
            adjustCamera
          >
            <WeaponModel url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-[10px] sm:text-xs text-gray-500 font-mono hidden sm:block">
        DRAG: Rotate &middot; SCROLL: Zoom &middot; SHIFT+DRAG: Pan
      </div>

      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[10px] sm:text-xs text-military-gold/60 font-mono uppercase">
        3D Model &middot; {weaponName}
      </div>
    </div>
  );
}
