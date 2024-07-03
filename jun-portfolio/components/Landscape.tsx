import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Landscape() { 
  const { scene } = useGLTF('/models/land/scene.gltf');
  const landscapeRef = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (landscapeRef.current) {
      landscapeRef.current.rotation.y += 0.00003; // Adjust the speed of rotation as needed
    }
  });

  return (
    <primitive
      object={scene}
      ref={landscapeRef}
      scale={[1.3, 1.3, 1.3]} // Adjust the scale here
      position={[-13, -14, -43]}    // Adjust the position here
      rotation={[0, Math.PI / 1.4, 0]} // Adjust the rotation here (in radians)
    />
  );
}
