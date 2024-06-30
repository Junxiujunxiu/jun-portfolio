import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Inventory: React.FC = () => {
  const matRef = useRef<THREE.Group>(null);
  const bookRef = useRef<THREE.Group>(null);

  const { scene: matScene } = useGLTF('/models/mat/scene.gltf') as unknown as GLTFResult;
  const { scene: bookScene, animations: bookAnimations } = useGLTF('/models/book/scene.gltf') as unknown as GLTFResult;

  const { actions: matActions } = useAnimations(matScene.animations, matRef);
  const { actions: bookActions } = useAnimations(bookAnimations, bookRef);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log('Loaded book animations:', bookAnimations);
    bookAnimations.forEach(animation => {
      console.log('Animation name:', animation.name);
    });

    if (bookRef.current) {
      bookRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          console.log('Setting userData actions on book mesh', bookActions);
          child.userData.actions = bookActions;
          console.log('Updated userData on', child, child.userData);
        }
      });
    }

    // Set initial animation state to closed (assuming the first frame is the closed state)
    const initialAction = bookActions['Animation'];
    if (initialAction) {
      initialAction.play();
      initialAction.paused = true; // Pause the animation initially
      initialAction.time = 0; // Set to the initial frame (closed state)
      console.log('Initial action set to closed state');
    }
  }, [bookAnimations, bookActions]);

  const handlePointerOver = (e: THREE.Event) => {
    console.log('Pointer over book');
    const book = bookRef.current;
    if (book) {
      book.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const actions = child.userData.actions as { [key: string]: THREE.AnimationAction };
          if (actions) {
            setIsHovered(true);
            Object.values(actions).forEach(action => {
              console.log(`Resetting and playing action: ${action.getClip().name}`);
              action.reset().fadeIn(0.5).play();
            });
          } else {
            console.log('No actions found in userData');
          }
        }
      });
    }
  };

  const handlePointerOut = (e: THREE.Event) => {
    console.log('Pointer out of book');
    const book = bookRef.current;
    if (book) {
      book.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const actions = child.userData.actions as { [key: string]: THREE.AnimationAction };
          if (actions) {
            setIsHovered(false);
            Object.values(actions).forEach(action => {
              console.log(`Resetting to closed state: ${action.getClip().name}`);
              action.paused = true; // Pause the animation
              action.time = 0; // Reset to the initial frame (closed state)
            });
          } else {
            console.log('No actions found in userData');
          }
        }
      });
    }
  };

  return (
    <group ref={matRef} position={[0, 1, 0]}>
      <primitive
        object={matScene}
        position={[0, 0, -1]} // Adjust the mat position
        scale={[7, 8, 10]} // Adjust the mat scale
        rotation={[0.7, 3, 0]} // Adjust the mat rotation
      />
      <primitive
        object={bookScene}
        ref={bookRef}
        position={[-4.2, 1.82, -3]} // Adjust the book position
        scale={[0.8, 0.8, 0.8]} // Adjust the book scale
        rotation={[0.7, -0.1, 0]} // Adjust the book rotation (rotate 45 degrees around Y-axis)
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
};

useGLTF.preload('/models/mat/scene.gltf');
useGLTF.preload('/models/book/scene.gltf');

export default Inventory;
