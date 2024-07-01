"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Road from '../components/Road';
import Character from '../components/Character';
import Inventory from '../components/Inventory';
import Landscape from '../components/Landscape';
import Skybox from '../components/Skybox';
import '../style.css';

const SetCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

const Home: React.FC = () => {
  const [showInventory, setShowInventory] = useState(false);

  const handleClickHead = () => {
    setShowInventory(!showInventory);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
      <div className="w-full h-full absolute">
        <Canvas className="w-full h-full">
        <Skybox />
          <ambientLight intensity={7} />
          <hemisphereLight args={['#80caff', '#b2b2b2', 0.6]} position={[0, 50, 0]} />
          <directionalLight position={[80, 40, 80]} intensity={1.5} />
          <SetCamera />
          <Character onClickHead={handleClickHead} />
          <Road />
          <Landscape />
          <OrbitControls />
          {showInventory && <Inventory />}
        </Canvas>
      </div>
    </main>
  );
};

export default Home;
