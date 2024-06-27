import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Character: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/boy/scene.gltf') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      // Define durations for each animation
      const animationDurations: { [key: string]: number } = {
        "Controls|NormalWalk": 7000, // 7 seconds
        "Controls|JumpCycle": 3000,  // 3 seconds
      };

      // Filter the desired animations
      const filteredActionNames = Object.keys(animationDurations);
      const playNextAnimation = (index: number) => {
        if (index >= filteredActionNames.length) {
          index = 0; // Loop back to the first animation
        }

        const actionName = filteredActionNames[index];
        const action = actions[actionName];
        if (action) {
          action.reset().fadeIn(0.5).play();
        } else {
          console.log(`No valid animation action found for "${actionName}".`);
        }

        setTimeout(() => {
          if (action) {
            action.fadeOut(0.5);
          }
          playNextAnimation(index + 1);
        }, animationDurations[actionName]); // Play each animation for its specified duration
      };

      // Start playing the first animation
      playNextAnimation(0);
    } else {
      console.log('Actions are null or undefined.');
    }
  }, [actions, animations]);

  if (!scene) {
    console.log('GLTF scene is null or undefined.');
    return null;
  }

  return (
    <group ref={group} dispose={null} scale={[3, 3, 3]} position={[0, -4.7, -11]} rotation={[0, 2.5, 0]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/boy/scene.gltf');

export default Character;
