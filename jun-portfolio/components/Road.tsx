import React, { useRef, useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { BoxGeometry, TextureLoader, Mesh, MeshStandardMaterial, RepeatWrapping } from 'three';
import { useLoader } from '@react-three/fiber';

// Extend the Three.js namespace with BoxGeometry
extend({ BoxGeometry });

const Road = () => {
  // Create a reference for the road mesh
  const roadRef = useRef<Mesh>(null);

  // Load the textures
  const texture = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Albedo/Diffuse map
  const normalMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Normal map
  const roughnessMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Roughness map
  const aoMap = useLoader(TextureLoader, '/Material.002_baseColor.jpeg'); // Ambient Occlusion map

  // Get the size of the canvas and viewport
  const { size, viewport } = useThree();
  const aspectRatio = viewport.width / viewport.height; // Calculate aspect ratio

  useEffect(() => {
    // Wrap textures for repeat
    [texture, normalMap, roughnessMap, aoMap].forEach((tex) => {
      if (tex) {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
        tex.repeat.set(70, -3); // Adjust repeat values for texture scrolling
      }
    });
  }, [texture, normalMap, roughnessMap, aoMap]);

  // Update the size of the road mesh when the window is resized
  useEffect(() => {
    if (roadRef.current) {
      // Dynamically calculate road dimensions based on the viewport size and aspect ratio
      const roadWidth = viewport.width * 20; // Adjust width scaling factor
      const roadHeight = aspectRatio < 1.5 ? 0.9 : 1.2; // Adjust height based on aspect ratio for mobile/tablet and desktop
      const roadDepth = viewport.height * 0.05; // Adjust depth based on viewport height

      roadRef.current.geometry.dispose(); // Dispose of old geometry
      roadRef.current.geometry = new BoxGeometry(roadWidth, roadHeight, roadDepth); // Create new geometry with updated size
    }
  }, [size, viewport, aspectRatio]); // <-- Added `aspectRatio` to the dependency array

  // Animate the texture offset to create a moving effect
  useFrame((state, delta) => {
    if (roadRef.current) {
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
    <mesh ref={roadRef} rotation={[-Math.PI / 2.3, -0.19, 0.7]} position={[20, 3.2, -11]}>
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
