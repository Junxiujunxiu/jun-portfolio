import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Landscape() { 
  const { scene } = useGLTF('/models/land/scene.gltf');

  return (
    <primitive
      object={scene}
     
      scale={[1.3, 1.3, 1.3]} // Adjust the scale here
      position={[-13, -14, -43]}    // Adjust the position here
      rotation={[0, Math.PI / 1.4, 0]} // Adjust the rotation here (in radians)
    />
  );
}