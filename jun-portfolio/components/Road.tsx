// components/Road.tsx
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { BoxGeometry, TextureLoader, Mesh, MeshStandardMaterial, RepeatWrapping } from 'three';
import { useLoader } from '@react-three/fiber';

// Extend the Three.js namespace with PlaneGeometry
extend({ BoxGeometry });

const Road = () => {
  // Create a reference for the road mesh with the correct type
  const roadRef = useRef<Mesh>(null);

  //Load the textures ---> Ensure this texture exists in your public folder
  const texture = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Albedo/Diffuse map
  const normalMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Normal map
  const roughnessMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Roughness map
  const aoMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Ambient Occlusion map
  const { size } = useThree(); // Get the size of the canvas

  useEffect(() => {
    [texture, normalMap, roughnessMap, aoMap].forEach(tex => {
      if (tex) {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
        tex.repeat.set(40, -3); // Adjust repeat values as needed
      }
    });
  }, [texture, normalMap, roughnessMap, aoMap]);

  // Animate the texture offset to create a moving effect
  useFrame((state, delta) => {
    if (roadRef.current) {
      // Cast the material to MeshStandardMaterial
      const material = roadRef.current.material as MeshStandardMaterial;
      if (material.map) {
        material.map.offset.x += delta * 0.9; 
      }
      if (material.normalMap) {
        material.normalMap.offset.x += delta * 0.05; 
      }
      if (material.roughnessMap) {
        material.roughnessMap.offset.x += delta * 0.02; 
      }
      if (material.aoMap) {
        material.aoMap.offset.x += delta * 0.10; 
      }
    }
  });

  return (
    <mesh ref={roadRef} rotation={[-Math.PI / 2.3, -0.2, 0.7]} position={[20, 2.9, -11]}>
      {/* Define the plane geometry for the road, extending the width based on the canvas size */}
      <boxGeometry args={[size.width / 10, 2, 1]} />
      {/* Apply the texture to the material */}
      <meshStandardMaterial
        attach="material"
        map={texture}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        roughness={1} // Adjust roughness as needed
      />
    </mesh>
  );
};

export default Road;