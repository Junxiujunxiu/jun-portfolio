import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend the Three.js namespace with BoxGeometry and Mesh
extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Character: React.FC<{ onClickHead: () => void }> = ({ onClickHead }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/boy/scene.gltf') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const { camera, gl } = useThree();

  // Create a reference for the head bounding box
  const headBoxRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (actions) {
      const animationDurations: { [key: string]: number } = {
        "Controls|NormalWalk": 7000, // 7 seconds
        "Controls|JumpCycle": 3000,  // 3 seconds
      };

      const filteredActionNames = Object.keys(animationDurations);
      const playNextAnimation = (index: number) => {
        if (index >= filteredActionNames.length) {
          index = 0;
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
        }, animationDurations[actionName]);
      };

      playNextAnimation(0);
    } else {
      console.log('Actions are null or undefined.');
    }

    const handlePointerDown = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(headBoxRef.current!, true);
      if (intersects.length > 0) {
        onClickHead();
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
    <group ref={group} dispose={null} scale={[3, 3, 3]} position={[0, -4.7, -11]} rotation={[0, 2.5, 0]}>
      <primitive object={scene} />
      <mesh ref={headBoxRef} position={[-0.4, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" opacity={0} transparent={true} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/models/boy/scene.gltf');

export default Character;
