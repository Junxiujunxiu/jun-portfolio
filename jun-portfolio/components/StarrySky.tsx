import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarrySky: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random star positions
  const starPositions = new Float32Array(6000);
  for (let i = 0; i < starPositions.length; i++) {
    starPositions[i] = (Math.random() - 0.5) * 2000; // Adjust range for star distribution
  }

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.visible = isVisible;
    }
  }, [isVisible]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005; // Slight rotation for effect
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          count={starPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.5} />
    </points>
  );
};

export default StarrySky;
