'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { Group } from 'three';
import { Suspense } from 'react';

function RotatingModel({ url, isHovered }: { url: string; isHovered: boolean }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      // Always rotate slowly, faster when hovered
      ref.current.rotation.y += delta * (isHovered ? 0.8 : 0.2);
    }
  });

  return <primitive ref={ref} object={scene.clone()} scale={1} />;
}

interface WeaponPreviewProps {
  modelUrl: string;
  isHovered: boolean;
}

export function WeaponPreview({ modelUrl, isHovered }: WeaponPreviewProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5} adjustCamera>
          <RotatingModel url={modelUrl} isHovered={isHovered} />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
