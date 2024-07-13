"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Road from '../components/Road';
import Character from '../components/Character';
import Dog from '../components/dog';
import Inventory from '../components/Inventory';
import Landscape from '../components/Landscape';
import Skybox from '../components/Skybox';
import StarrySky from '../components/StarrySky';
import Sun from '../components/Sun';
import Moon from '../components/Moon';
import Navbar from '../components/Navbar';
import Logos from '../components/Logos';
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
  const [isNight, setIsNight] = useState(false);
  const [blur, setBlur] = useState(false);

  const handleClickHead = () => {
    setShowInventory(!showInventory);
  };

  const handleSunClick = () => {
    setBlur(true);
    setTimeout(() => {
      setIsNight(false);
      setBlur(false);
    }, 300); // duration of blur in milliseconds
  };

  const handleMoonClick = () => {
    setBlur(true);
    setTimeout(() => {
      setIsNight(true);
      setBlur(false);
    }, 300); // duration of blur in milliseconds
  };

  useEffect(() => {
    console.log('isNight state changed:', isNight);
  }, [isNight]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
      <div className={`w-full h-full absolute ${blur ? 'blur' : ''}`}>
        <Canvas className="w-full h-full">
          <ambientLight intensity={1} />
          <hemisphereLight args={['#80caff', '#b2b2b2', 0.6]} position={[0, 50, 0]} />
          <directionalLight position={[80, 40, 80]} intensity={1.5} />
          <SetCamera />
          <Character onClickHead={handleClickHead} />
          <Dog />
          <Road />
          <Landscape />
          <Skybox isVisible={!isNight} />
          <StarrySky isVisible={isNight} />
          <OrbitControls />
          {showInventory && <Inventory />}
          <Navbar />
        </Canvas>
      </div>
      <Sun onClick={handleSunClick} />
      <Moon onClick={handleMoonClick} />
      <Logos />
    </main>
  );
};

export default Home;
