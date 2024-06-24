"use client"

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Box} from '@react-three/drei';

export default function HomePage(){
  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to My 3D Portfolio</h1>
      <div className="w-full h-full">
        <Canvas className="w-full h-full">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]}>
            <meshStandardMaterial attach="material" color="orange" />
          </Box>
          <Box position={[1.2, 0, 0]}>
            <meshStandardMaterial attach="material" color="blue" />
          </Box>
          <OrbitControls />
        </Canvas>
      </div>
    </main>
  )
}
