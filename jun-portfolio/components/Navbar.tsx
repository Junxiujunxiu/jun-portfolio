// components/Navbar.tsx
import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

extend({ BoxGeometry: THREE.BoxGeometry, Mesh: THREE.Mesh });

const Navbar: React.FC = () => {
  const navRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (navRef.current) {
      navRef.current.position.y = THREE.MathUtils.lerp(navRef.current.position.y, 10, 0.1);
    }
  });

  return (
    <group ref={navRef} position={[14, 20, 10]}>
      <Html>
        <div className="navbar">
          <button className="nav-toggle text-black-10 py-2 px-6 rounded border-2 border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-grey-600 font-deersnow">
            Jun's journey
          </button>
          <div className="nav-content hidden absolute top-full left-0 bg-transparent p-2 rounded shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto flex-col items-start">
            <ul className="list-none p-0 flex flex-col w-full font-deersnow">
              <li className="my-2">
                <Link href="/aboutMe" className="text-black-10 text-lg transition-all duration-300 ease-in-out hover:text-gray-400">
                  About Me
                </Link>
              </li>
              <li className="my-2">
                <Link href="/skills" className="text-black-10 text-lg transition-all duration-300 ease-in-out hover:text-gray-400">
                  Skills
                </Link>
              </li>
              <li className="my-2">
                <Link href="/myGrades" className="text-black-10 text-lg transition-all duration-300 ease-in-out hover:text-gray-400">
                  My Grades
                </Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="text-black-10 text-lg transition-all duration-300 ease-in-out hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default Navbar;
