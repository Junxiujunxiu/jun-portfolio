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
      const newScale = aspectRatio < 1 ? aspectRatio * 4 : 4; // Adjust scaling factor as needed
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
        position={[-5.6, 1, 6.56]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[0.7, 0.7, 0.7]}
        link="https://github.com/Junxiujunxiu/ENSE701_Group8"
        title="Speed App"
      />
      <Book
        position={[-2.6, 1, 8]}
        rotation={[1.58, 0.03, -11.86]}
        scale={[0.7, 0.7, 0.7]}
        link="https://github.com/evanvonzhou/autcsa-web/tree/master/src"
        title="Student Association Web"
      />

<Book
       position={[-2.6, -4.5, 8]}
       rotation={[1.58, 0.03, -11.86]}
        scale={[0.7, 0.7, 0.7]}
        link="https://github.com/Junxiujunxiu/jun-portfolio"
        title="3d portfolio"
      />

<Book
        position={[-2.6, -1.8, 8]}
        rotation={[1.58, 0.03, -11.86]}
        scale={[0.7, 0.7, 0.7]}
        link="https://github.com/Junxiujunxiu/Weather-App"
        title="Weather App"
      />

<Book
        position={[-5.6, -2, 6.56]}
        rotation={[1.58, 0.02, -12.4]}
        scale={[0.7, 0.7, 0.7]}
        link="https://github.com/Junxiujunxiu/fireflies"
        title="Fireflies in the dark"
      />
    </group>
  );
};

useGLTF.preload('/models/mat/scene.gltf');
useGLTF.preload('/models/book/scene.gltf');

export default Inventory;
