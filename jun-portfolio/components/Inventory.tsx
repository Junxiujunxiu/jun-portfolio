import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Book from './Book';  // Import the Book component

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Inventory: React.FC = () => {
  const matRef = useRef<THREE.Group>(null);
  const { scene: matScene } = useGLTF('/models/mat/scene.gltf') as unknown as GLTFResult;

  const [matScale, setMatScale] = useState<[number, number, number]>([5, 5, 5]); // Original size
  const [bookScale, setBookScale] = useState<[number, number, number]>([0.7, 0.7, 0.7]); // Default book scale
  const [bookPosition, setBookPosition] = useState<[number, number, number][]>([
    [-5.6, 1, 6.56],
    [-2.6, 1, 8],
    [-2.6, -4.5, 8],
    [-2.6, -1.8, 8],
    [-5.6, -2, 6.56],
  ]);

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;

      // Adjust mat scaling factor based on aspect ratio
      const newMatScale: [number, number, number] = aspectRatio < 1 ? [aspectRatio * 4, aspectRatio * 4, aspectRatio * 4] : [4, 4, 4];
      setMatScale(newMatScale);

      // Adjust book scale dynamically based on screen width
      if (window.innerWidth < 768) {
        // For mobile, reduce book size and adjust positions for smaller layout
        setBookScale([0.3, 0.3, 0.3]);
        setBookPosition([
          [-5, -0.2, 6.9],  // Adjust Z position to be further from the mat
          [-3.5, -0.2, 7.4], // Adjust Z position for better visibility
          [-3.5, -1.5, 7.4],
          [-3.5, -3, 7.4],
          [-5, -2, 6.9],
        ]);
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        // Tablet size
        setBookScale([0.5, 0.5, 0.5]);
        setBookPosition([
          [-4.6, 0.8, 7],  // Adjust Z position for tablet
          [-3.0, 0.8, 8.5],
          [-3.0, -2.0, 8.5],
          [-3.0, -1.5, 8.5],
          [-4.6, -1.5, 7],
        ]);
      } else {
        // For desktop, keep original size and positions
        setBookScale([0.7, 0.7, 0.7]);
        setBookPosition([
          [-5.6, 1, 6.56],  // Original positions for desktop
          [-2.6, 1, 8],
          [-2.6, -4.5, 8],
          [-2.6, -1.8, 8],
          [-5.6, -2, 6.56],
        ]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial scale and position based on the initial window size

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

      {/* Responsive book scaling and positioning */}
      <Book
        position={bookPosition[0]} // Dynamic book position
        rotation={[1.58, 0.02, -12.4]}
        scale={bookScale} // Dynamic book scale
        link="https://github.com/Junxiujunxiu/ENSE701_Group8"
        title="Speed App"
      />
      <Book
        position={bookPosition[1]}
        rotation={[1.58, 0.03, -11.86]}
        scale={bookScale}
        link="https://github.com/Junxiujunxiu/Web-project/tree/main/autcsa-web"
        title="Student Association Web"
      />
      <Book
        position={bookPosition[2]}
        rotation={[1.58, 0.03, -11.86]}
        scale={bookScale}
        link="https://github.com/Junxiujunxiu/jun-portfolio"
        title="3D Portfolio"
      />
      <Book
        position={bookPosition[3]}
        rotation={[1.58, 0.03, -11.86]}
        scale={bookScale}
        link="https://github.com/Junxiujunxiu/Weather-App"
        title="Weather App"
      />
      <Book
        position={bookPosition[4]}
        rotation={[1.58, 0.02, -12.4]}
        scale={bookScale}
        link="https://github.com/Junxiujunxiu/fireflies"
        title="Fireflies in the Dark"
      />
    </group>
  );
};

useGLTF.preload('/models/mat/scene.gltf');
useGLTF.preload('/models/book/scene.gltf');

export default Inventory;
