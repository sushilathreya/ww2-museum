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

/**
 * Placeholder 3D viewer that shows a rotating box when no 3D model is available.
 */
function PlaceholderModel() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#c9a227" wireframe />
      </mesh>
    </group>
  );
}

export function WeaponViewerPlaceholder({ weaponName }: { weaponName: string }) {
  return (
    <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PlaceholderModel />
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>

      <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono">
        DRAG: Rotate &middot; SCROLL: Zoom
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono bg-black/50 px-3 py-1 rounded">
        3D MODEL PLACEHOLDER &middot; {weaponName}
      </div>
    </div>
  );
}
