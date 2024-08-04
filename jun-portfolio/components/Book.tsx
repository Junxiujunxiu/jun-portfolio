import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

interface BookProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  link: string;
  title: string;
}

const Book: React.FC<BookProps> = ({ position, rotation, scale, link, title }) => {
  const bookRef = useRef<THREE.Group>(null);
  const { scene: originalScene, animations: originalAnimations } = useGLTF('/models/book/scene.gltf') as unknown as GLTFResult;

  // Clone the scene and animations
  const bookScene = originalScene.clone();
  const bookAnimations = originalAnimations.map(clip => clip.clone());
  const { actions: bookActions } = useAnimations(bookAnimations, bookRef);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.userData.actions = bookActions;
        }
      });
    }

    const initialAction = bookActions['Animation'];
    if (initialAction) {
      initialAction.play();
      initialAction.paused = true;
      initialAction.time = 0;
    }

    console.log(`Book "${title}" loaded with position: ${position}`);
  }, [bookAnimations, bookActions, position, title]);

  const handlePointerOver = (e: THREE.Event) => {
    setIsHovered(true);
    const book = bookRef.current;
    if (book) {
      book.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const actions = child.userData.actions as { [key: string]: THREE.AnimationAction };
          if (actions) {
            Object.values(actions).forEach(action => {
              action.reset().fadeIn(0.5).play();
            });
          }
        }
      });
    }
    console.log('Pointer over book:', title);
  };

  const handlePointerOut = (e: THREE.Event) => {
    setIsHovered(false);
    const book = bookRef.current;
    if (book) {
      book.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const actions = child.userData.actions as { [key: string]: THREE.AnimationAction };
          if (actions) {
            Object.values(actions).forEach(action => {
              action.paused = true;
              action.time = 0;
            });
          }
        }
      });
    }
    console.log('Pointer out of book:', title);
  };

  const handlePointerClick = (e: THREE.Event) => {
    window.open(link, '_blank');
    console.log('Book clicked:', title);
  };

  return (
    <>
      <primitive
        object={bookScene}
        ref={bookRef}
        position={position}
        scale={scale}
        rotation={rotation}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handlePointerClick}
      />
      {isHovered && (
        <Html position={position}>
          <div className="title" style={{
            color: '#007BFF',
            fontSize: '30px',
            fontWeight: 'bold',
            animation: 'fadeIn 1s ease-in-out'
          }}>
            {title}
          </div>
          <style>
            {`
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              .title {
                animation: fadeIn 1s ease-in-out;
              }
            `}
          </style>
        </Html>
      )}
    </>
  );
};

export default Book;
