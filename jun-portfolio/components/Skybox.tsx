import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Skybox: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const { scene } = useGLTF('/models/skybox/scene.gltf');
  const sceneRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.visible = isVisible;
    }
  }, [isVisible]);

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.00001; // Adjust the speed of rotation as needed
    }
  });

  return <primitive object={scene} ref={sceneRef} />;
};

export default Skybox;
