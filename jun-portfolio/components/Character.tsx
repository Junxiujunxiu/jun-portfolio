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
  // create a mutable object that persists across renders. The .current property of the ref can hold any value, and it persist between renders. like i can assign manually like ref.current = scene. but in this project, useAnimations() hook will internally assign it.
  const group = useRef<THREE.Group>(null);

  // Load the GLTF model(scene) and animations using useGLTF hook
  const { scene, animations } = useGLTF('/models/boy/scene.gltf') as unknown as GLTFResult; //-> this is the interface defined

  // Extract animations and actions from the loaded animations
  const { actions } = useAnimations(animations, group);

  // Get the current camera and WebGL renderer(API that renders directly within web browser) instance from the useThree hook
  const { camera, gl } = useThree();

  // Create a reference for the head bounding box holding the THREE.mesh object.
  const headBoxRef = useRef<THREE.Mesh>(null);

  // Effect hook to handle animation and click events
  useEffect(() => {
    // Function to play animations in sequence
    const playNextAnimation = (index: number) => {
      // define the key-value pair object for the animation name and duration.
      const animationDurations: { [key: string]: number } = {
        "Controls|NormalWalk": 7000, // 7 seconds
        "Controls|JumpCycle": 3000,  // 3 seconds
      };

      // returns ["Controls|NormalWalk", "Controls|JumpCycle"]
      const filteredActionNames = Object.keys(animationDurations);

      // Ensure animation index stays within bounds
      if (index >= filteredActionNames.length) {
        index = 0;
      }

      // Retrieve the action and play it
      const actionName = filteredActionNames[index];
      //retreive the specific animation object.
      const action = actions[actionName];
      //if action exist, reset, fade in and play.
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
        //recursive loop till all the animation is played.
        playNextAnimation(index + 1);
      }, animationDurations[actionName]);//-> after 7 seconds.
    };

    // Start playing animations from the beginning and keep recursive loop.
    playNextAnimation(0);

    // Function to handle mouse click on the head
    const handlePointerDown = (event: MouseEvent) => {
      // Store the normalized coordinates of the mouse click
      const mouse = new THREE.Vector2();
      //give the mouse position in pixels related to the window.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Create a raycaster from the camera and mouse position
      //like a laser beam to find out which objects in your scene are under a particular point.
      const raycaster = new THREE.Raycaster();
      //ray starts from camera and extends through the 3d point in the scene that correspondes to the mouses's position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the head bounding box
      //headBoxRef refer to bounding box in <mesh>
      //the true will also check all descendant objects of the specified object if the object has nested objects
      //it returns the array of intersec points
      const intersects = raycaster.intersectObject(headBoxRef.current!, true); //->! not null operator saying am sure it is not null.
      if (intersects.length > 0) {
        onClickHead();  // Execute onClickHead callback if head is clicked
      }
    };

    // Add event listener for mouse click events to the <canvas> element -> pointerdown -> everytime i click the mouse, it is triggered and checks for intersection in handlePointerDown function and it it is, call the onClickHead and show the inventory.-> refer to the page.tsx <Character>.
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
      <primitive object={scene} />  {/* render three.js object directly into ract component tree, making it part of UI */}
      <mesh ref={headBoxRef} position={[-0.4, 2, 0]}>  {/* Head bounding box */}
        <boxGeometry args={[1, 1, 1]} />  {/* it defines the shape of the mesh with dimension */}
        <meshBasicMaterial color="red" opacity={0} transparent={false} />  {/* appearance of the mesh -> set false for visualize and debugging */}
      </mesh>
    </group>
  );
};

// Preload the GLTF model to ensure it's ready when component mounts
useGLTF.preload('/models/boy/scene.gltf');

export default Character;  // Export the Character component