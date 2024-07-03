import React from 'react';
import { useGLTF } from '@react-three/drei';

interface MoonProps {
  onClick: () => void;
}

const Moon: React.FC<MoonProps> = ({ onClick }) => {
  const { scene } = useGLTF('/models/moon/scene.gltf');
  return (
    <primitive
      object={scene}
      onClick={onClick}
      position={[-11, 12.6, -10.4]}
      rotation={[Math.PI / 8, Math.PI / 8,-8]} // Adjust the rotation as needed
      scale={[0.4, 0.4, 0.4]} // Adjust the scale as needed
    />
  );
};

export default Moon;
