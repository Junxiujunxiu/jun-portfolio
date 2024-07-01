import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree, extend } from '@react-three/fiber';
import Inventory from './Inventory';
import * as THREE from 'three';

// Extend the Three.js namespace with BoxGeometry and Mesh
extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

// Define the type for the GLTF result, including scene and animations
interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

// Separate the props
interface CharacterProps {
  onClickHead: () => void;
} 

// Define the functional component Character that takes the callback function onClickHead as a prop that returns nothing.-> generic type.
const Character: React.FC<CharacterProps> = ({ onClickHead }) => {
  const group = useRef<THREE.Group>(null);

  // Load the GLTF model(scene) and animations using useGLTF hook
  const { scene, animations } = useGLTF('/models/boy/scene.gltf') as unknown as GLTFResult;

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
  }, [animations, actions]);

  // Get the current camera and WebGL renderer instance from the useThree hook
  const { camera, gl } = useThree();

   // Adjust camera settings
   useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.near = 1; // Set near clipping plane
    perspectiveCamera.far = 1000; // Set far clipping plane
    perspectiveCamera.fov = 90; // Set field of view
    perspectiveCamera.position.set(-7, 0, 13.6); // Adjust the camera position
    
    perspectiveCamera.updateProjectionMatrix(); // Update the camera projection matrix with the new values
  }, [camera]);

  const headBoxRef = useRef<THREE.Mesh>(null);

  const [showInventory, setShowInventory] = useState(false);

  // Effect hook to handle animation and click events
  useEffect(() => {
    const playNextAnimation = (index: number) => {
      const animationDurations: { [key: string]: number } = {
        "Walk": 8000, // 4 seconds
        "Run": 4000, // 4 seconds
        "Jump": 2000, // 4 seconds
      };

      const filteredActionNames = Object.keys(animationDurations);

      if (index >= filteredActionNames.length) {
        index = 0;
      }

      const actionName = filteredActionNames[index];
      const action = actions[actionName];

      if (action) {
        action.reset().fadeIn(0.5).play();
        console.log(`Playing animation "${actionName}"`);

        // Log the position before the animation starts
        if (group.current) {
          console.log('Position before animation:', group.current.position);
        }
      } else {
        console.log(`No valid animation action found for "${actionName}".`);
      }

      setTimeout(() => {
        if (action) {
          action.fadeOut(0.5);
          // Log the position after the animation ends
          if (group.current) {
            console.log('Position after animation:', group.current.position);
          }
        }
        playNextAnimation(index + 1);
      }, animationDurations[actionName]);
    };

    playNextAnimation(0);

    const handlePointerDown = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(headBoxRef.current!, true);
      if (intersects.length > 0) {
        onClickHead();
        setShowInventory(!showInventory);
      }
    };

    gl.domElement.addEventListener('pointerdown', handlePointerDown);

    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [actions, camera, gl, onClickHead]);

  if (!scene) {
    console.log('GLTF scene is null or undefined.');
    return null;
  }

  return (
    <group ref={group} dispose={null} scale={[2, 2, 2]} position={[5.5, -0.2, 1]} rotation={[0.1, 2.3, 0.09]}>
      <primitive object={scene} />  {/* render three.js object directly into react component tree, making it part of UI */}
      <mesh ref={headBoxRef} position={[-0.4, 2, 0]}>  {/* Head bounding box */}
        <boxGeometry args={[1, 1, 1]} />  {/* it defines the shape of the mesh with dimension */}
        <meshBasicMaterial color="red" opacity={0} transparent={true} />  {/* appearance of the mesh -> set false for visualize and debugging */}
      </mesh>
      {showInventory && <Inventory />}
    </group>
  );
};

// Preload the GLTF model to ensure it's ready when component mounts
useGLTF.preload('/models/boy/scene.gltf');

export default Character;  // Export the Character component
