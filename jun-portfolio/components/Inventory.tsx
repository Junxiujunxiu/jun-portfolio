import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import Book from './Book';  // Import the Book component

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Inventory: React.FC = () => {
  const matRef = useRef<THREE.Group>(null);
  const { scene: matScene } = useGLTF('/models/mat/scene.gltf') as unknown as GLTFResult;

  const [matScale, setMatScale] = useState([5, 5, 5]); // Original size

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const newScale = aspectRatio < 1 ? aspectRatio * 5 : 5; // Adjust scaling factor as needed
      setMatScale([newScale, newScale, newScale]);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial scale based on the initial window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <group ref={matRef} position={[0, 2.2, 0]}>
      <primitive
        object={matScene}
        position={[-4, -1.6, 7.2]} // Adjust the mat position
        scale={matScale} // Dynamic scale based on window size
        rotation={[6.3, 2.7, -0.04]} // Adjust the mat rotation
      />
      <Book
        position={[-7, -2, 6.32]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[0.8, 0.8, 0.8]}
        link="https://github.com/Junxiujunxiu/jun-portfolio.git"
        title="Jun's portfolio"
      />
      <Book
        position={[-10, -2, 6.32]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[1, 1, 1]}
        link="https://github.com/Junxiujunxiu/jun-second-portfolio.git"
        title="Jun's second portfolio"
      />

<Book
        position={[-14, -4, 7]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[1, 1, 1]}
        link="https://github.com/Junxiujunxiu/jun-second-portfolio.git"
        title="Jun's second portfolio"
      />

<Book
        position={[-2, -2, 10]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[1, 1, 1]}
        link="https://github.com/Junxiujunxiu/jun-second-portfolio.git"
        title="Jun's second portfolio"
      />

<Book
        position={[-14, -4, 4.32]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[1, 1, 1]}
        link="https://github.com/Junxiujunxiu/jun-second-portfolio.git"
        title="Jun's second portfolio"
      />
    </group>
  );
};

useGLTF.preload('/models/mat/scene.gltf');
useGLTF.preload('/models/book/scene.gltf');

export default Inventory;
