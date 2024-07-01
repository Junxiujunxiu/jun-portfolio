import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Skybox() {
  const { scene } = useGLTF('/models/skybox/scene.gltf');
  return <primitive object={scene} />;
}