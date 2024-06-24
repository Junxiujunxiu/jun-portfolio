"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import Road from '../components/Road';
// need later import Character from '../components/Character';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
      <h1 className="text-4xl font-bold mb-6 absolute z-10">Welcome to My 3D Portfolio</h1>
      <div className="w-full h-full absolute">
        <Canvas className="w-full h-full">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Road />
          <OrbitControls />
        </Canvas>
      </div>
    </main>
  );
}