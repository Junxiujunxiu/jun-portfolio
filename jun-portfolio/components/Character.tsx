import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree, extend } from '@react-three/fiber';
//import the entire Three.js library and assigning it to the 'THREE' object, making everything accessible via the THREE
import * as THREE from 'three';

// Extend the Three.js namespace with BoxGeometry and Mesh
//Create another namespace BoxGeometry and Mesh that contains the THREE namespace functions so that i can use like BoxGeometry(1, 1, 1) directly instead of using THREE.BoxGeometry(1,1,1)
extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

// Define the type for the GLTF result, including scene and animations
interface GLTFResult {
  scene: THREE.Group;  //property scene of type THREE.Group
  animations: THREE.AnimationClip[];  // property animation of type THREE.animationClip array.
}

// define the funtional component Character that takes the callback function onClickHead as a prop that returns nothing.-> generic type.
const Character: React.FC<{ onClickHead: () => void }> = ({ onClickHead }) => {
  // create a ref for THREE.Group with initial value null.
  //later i can assign the value with group.current = value (it shoud be type THREE.Group)
  const group = useRef<THREE.Group>(null);

  // Load the GLTF model and animations using useGLTF hook
  const { scene, animations } = useGLTF('/models/boy/scene.gltf') as unknown as GLTFResult;

  // Extract animations and actions from the loaded animations
  const { actions } = useAnimations(animations, group);

  // Get the current camera and WebGL renderer instance from the useThree hook
  const { camera, gl } = useThree();

  // Create a reference for the head bounding box
  const headBoxRef = useRef<THREE.Mesh>(null);

  // Effect hook to handle animation and click events
  useEffect(() => {
    // Function to play animations in sequence
    const playNextAnimation = (index: number) => {
      // List of animation names and their durations
      const animationDurations: { [key: string]: number } = {
        "Controls|NormalWalk": 7000, // 7 seconds
        "Controls|JumpCycle": 3000,  // 3 seconds
      };

      // Get the list of valid animation names
      const filteredActionNames = Object.keys(animationDurations);

      // Ensure animation index stays within bounds
      if (index >= filteredActionNames.length) {
        index = 0;
      }

      // Retrieve the action and play it
      const actionName = filteredActionNames[index];
      const action = actions[actionName];
      if (action) {
        action.reset().fadeIn(0.5).play();
      } else {
        console.log(`No valid animation action found for "${actionName}".`);
      }

      // Schedule next animation and fade out current action
      setTimeout(() => {
        if (action) {
          action.fadeOut(0.5);
        }
        playNextAnimation(index + 1);
      }, animationDurations[actionName]);
    };

    // Start playing animations from the beginning
    playNextAnimation(0);

    // Function to handle mouse click on the head
    const handlePointerDown = (event: MouseEvent) => {
      // Calculate normalized mouse coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Create a raycaster from the camera and mouse position
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the head bounding box
      const intersects = raycaster.intersectObject(headBoxRef.current!, true);
      if (intersects.length > 0) {
        onClickHead();  // Execute onClickHead callback if head is clicked
      }
    };

    // Add event listener for mouse click events
    gl.domElement.addEventListener('pointerdown', handlePointerDown);

    // Clean up: remove event listener on component unmount
    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [actions, camera, gl, onClickHead]);  // Dependency array for useEffect hook

  // Render null if GLTF scene is not loaded
  if (!scene) {
    console.log('GLTF scene is null or undefined.');
    return null;
  }

  // Render the character group and head bounding box
  return (
    <group ref={group} dispose={null} scale={[3, 3, 3]} position={[0, -4.7, -11]} rotation={[0, 2.5, 0]}>
      <primitive object={scene} />  {/* Render the GLTF scene as a primitive */}
      <mesh ref={headBoxRef} position={[-0.4, 2, 0]}>  {/* Head bounding box */}
        <boxGeometry args={[1, 1, 1]} />  {/* Box geometry for the head */}
        <meshBasicMaterial color="red" opacity={0} transparent={true} />  {/* Material for the head box */}
      </mesh>
    </group>
  );
};

// Preload the GLTF model to ensure it's ready when component mounts
useGLTF.preload('/models/boy/scene.gltf');

export default Character;  // Export the Character component