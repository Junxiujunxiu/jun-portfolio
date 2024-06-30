"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Road from '../components/Road';
import Character from '../components/Character';
import Inventory from '../components/Inventory';
import '../style.css';

//it returns null, the purpose is soley to perform setup actions related to camera
const SetCamera = () => {
  //object destructuring-> only assign the returned camera property to the variable camera, so i don't need to use camera.camera
  const { camera } = useThree();
  //side effects-> runs when the component mounts or camera object changes.
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
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <SetCamera />
          <Character onClickHead={handleClickHead} />
          <Road />
          <OrbitControls />
          {showInventory && <Inventory />}
        </Canvas>
      </div>
    </main>
  );
};

export default Home;
