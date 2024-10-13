"use client";

import React, { useEffect, useState,Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';

import Navbar from '../components/Navbar';
import Logos from '../components/Logos';

import '../style.css';

const Character = dynamic(() => import('../components/Character'), { ssr: false });
const Dog = dynamic(() => import('../components/dog'), { ssr: false });
const Road = dynamic(() => import('../components/Road'), { ssr: false });
const Landscape = dynamic(() => import('../components/Landscape'), { ssr: false });
const Skybox = dynamic(() => import('../components/Skybox'), { ssr: false });
const Inventory = dynamic(() => import('../components/Inventory'), {
  ssr: false,
});

const SetCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

const Home: React.FC = () => {
  const [showInventory, setShowInventory] = useState(false); // State for showing/hiding inventory

  const toggleInventory = () => {
    setShowInventory((prevShowInventory) => !prevShowInventory); // Toggle the state
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
      <div className="w-full h-full absolute">
        <Canvas className="w-full h-full">
          <ambientLight intensity={1} />
          <hemisphereLight args={['#80caff', '#b2b2b2', 0.6]} position={[0, 50, 0]} />
          <directionalLight position={[80, 40, 80]} intensity={1.5} />
          <SetCamera />
          <Character />
          <Dog />
          <Road />
          <Landscape />
          <Skybox isVisible={true} />
          <OrbitControls />
          
          {/* Conditionally render Inventory */}
          {showInventory && <Inventory />}
        </Canvas>
      </div>
      {/* Pass the toggleInventory function to Navbar */}
      <Navbar onToggleInventory={toggleInventory} />
      <Logos />
    </main>
  );
};

export default Home;
