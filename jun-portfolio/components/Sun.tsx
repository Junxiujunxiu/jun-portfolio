import React from 'react';
import { useGLTF } from '@react-three/drei';

interface SunProps {
  onClick: () => void;
}

const Sun: React.FC<SunProps> = ({ onClick }) => {
  const { scene } = useGLTF('/models/sun/scene.gltf');

  return (
    <primitive
      object={scene}
      onClick={onClick}
      position={[-12, 13, -10]}
      rotation={[Math.PI / 6, Math.PI / 11, 0]} // Adjust the rotation as needed
      scale={[0.8, 0.8, 0.8]} // Adjust the scale as needed
    />
  );
};

export default Sun;
