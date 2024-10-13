import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onToggleInventory: () => void; // Receive a function to toggle inventory
}

const Navbar: React.FC<NavbarProps> = ({ onToggleInventory }) => {
  return (
    <>
      <div className="fixed top-4 right-40 z-20">
        <div className="relative group">
          <button className="nav-toggle text-black-10 py-2 px-6 rounded border-2 border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-gray-600 font-deersnow">
            Jun's journey
          </button>

          <div className="nav-content absolute top-full left-0 bg-transparent p-2 rounded shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto flex-col items-start hidden group-hover:flex">
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
              <li className="my-2">
                {/* Call the function passed from Home to toggle Inventory */}
                <button
                  onClick={onToggleInventory}
                  className="text-black-10 text-lg transition-all duration-300 ease-in-out hover:text-gray-400"
                >
                  Projects
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
