import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend the Three.js namespace with BoxGeometry and Mesh
extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

// Define the type for the GLTF result, including scene and animations
interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Dog: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  // Load the GLTF model(scene) and animations using useGLTF hook
  const { scene, animations } = useGLTF('https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/models/dog/scene.gltf');




  // Extract animations and actions from the loaded animations
  const { actions } = useAnimations(animations, group);

  // Log the animations array to the console
  useEffect(() => {
    console.log('Loaded animations:', animations);
    animations.forEach((clip) => {
      console.log(`Animation Clip: ${clip.name}`);
      clip.tracks.forEach((track) => {
        console.log(`Track: ${track.name}`);
      });
    });

    // Log available actions as an array of strings
    const actionNames = Object.keys(actions);
    console.log('Available actions:', actionNames);

    // Example to play the 'correr.002' animation
    const playAnimation = (name: string) => {
      const action = actions[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
        console.log(`Playing animation "${name}"`);
      } else {
        console.log(`No valid animation action found for "${name}".`);
      }
    };

    // Play the 'correr.002' animation as an example
    playAnimation('correr.002');

    // Optionally, you can cycle through animations
    let currentAnimation = 0;
    const animationNames = [
      // 'correr.002',
      // 'Armature_perro_AZUL|Action',
      // 'Armature_perro_AZUL|Action.001',
      // 'Armature_perro_AZUL|Action.002',
      // 'Armature_perro_AZUL|correr',
      // 'Armature_perro_AZUL|correr.001',
      'Circle.002|Action.001',
      'Circle.002|Action.002'
    ];

    const playNextAnimation = () => {
      currentAnimation = (currentAnimation + 1) % animationNames.length;
      playAnimation(animationNames[currentAnimation]);
      setTimeout(playNextAnimation, 8000); // Adjust timing as needed
    };

    // Start the animation cycle
    playNextAnimation();

  }, [animations, actions]);

  if (!scene) {
    console.log('GLTF scene is null or undefined.');
    return null;
  }

  return (
    <group ref={group} dispose={null} scale={[0.03, 0.03, 0.03]} position={[1.7, -3.2, 3.8]} rotation={[0.5, 5.4, 0.4]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the GLTF model to ensure it's ready when component mounts
useGLTF.preload('https://3d-assets-portfolio.s3.amazonaws.com/models/dog/scene.gltf');


export default Dog;
