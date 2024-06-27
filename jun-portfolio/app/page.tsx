"use client";

import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Road from '../components/Road';
import Character from '../components/Character';

const SetCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
      {/* <h1 className="text-4xl font-bold mb-6 absolute z-10">Welcome to My 3D Portfolio</h1> */}
      <div className="w-full h-full absolute">
        <Canvas className="w-full h-full" >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <SetCamera />
          <Character />
          <Road />
          
          <OrbitControls />
        </Canvas>
      </div>
    </main>
  );
}
