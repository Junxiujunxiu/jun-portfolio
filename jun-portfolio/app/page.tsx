"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Road from '../components/Road';
import Character from '../components/Character';
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

//even if it does not accep props, it specifies that i can accept props by using React.FC -> functional component-> type script feature.
const Inventory: React.FC = () => {
  return (
    <div className="inventory-container absolute top-10 left-10 p-5 rounded-lg shadow-lg z-10 max-w-sm w-full">
      <h3 className="text-2xl font-bold mb-4 text-center text--800">My Projects</h3>
      <ul className="list-none p-0 m-0">
        <li className="inventory-item mb-2 p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition-all">Project 1</li>
        <li className="inventory-item mb-2 p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition-all">Project 2</li>
        <li className="inventory-item mb-2 p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition-all">Project 3</li>
        {/* Add more projects here */}
      </ul>
    </div>
  );
};

export default function Home() {
  const [showInventory, setShowInventory] = useState(false);

  //when the head is clicked, set ShowInventory to true and renders inventory below.
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
        </Canvas>
      </div>
       {/* when showInventory is true, renders Inventory */}
      {showInventory && <Inventory />} 
    </main>
  );
}
