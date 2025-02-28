import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';

extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

const Character: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF('https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/models/boy/scene.gltf') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log('Loaded animations:', animations);
    animations.forEach((clip) => {
      console.log(`Animation Clip: ${clip.name}`);
      clip.tracks.forEach((track) => {
        console.log(`Track: ${track.name}`);
      });
    });

    const actionNames = Object.keys(actions);
    console.log('Available actions:', actionNames);
  }, [animations, actions]);

  const { camera, gl } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.near = 1;
    perspectiveCamera.far = 1000;
    perspectiveCamera.fov = 90;
    perspectiveCamera.position.set(-7, 0, 13.6);
    perspectiveCamera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const playNextAnimation = (index: number) => {
      const animationDurations: { [key: string]: number } = {
        "Walk": 8000,
        "Run": 4000,
        "Jump": 2000,
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

        if (group.current) {
          console.log('Position before animation:', group.current.position);
        }
      } else {
        console.log(`No valid animation action found for "${actionName}".`);
      }

      setTimeout(() => {
        if (action) {
          action.fadeOut(0.5);
          if (group.current) {
            console.log('Position after animation:', group.current.position);
          }
        }
        playNextAnimation(index + 1);
      }, animationDurations[actionName]);
    };

    playNextAnimation(0);
  }, [actions, camera, gl]);

  if (!scene) {
    console.log('GLTF scene is null or undefined.');
    return null;
  }

  return (
    <group ref={group} dispose={null} scale={[2, 2, 2]} position={[5.5, -0.2, 1]} rotation={[0.1, 2.3, 0.09]}>
      <primitive object={scene} />
    </group>
  );
};

// **Updated the preload path to AWS S3 URL**
useGLTF.preload('https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/models/boy/scene.gltf');

export default Character;
