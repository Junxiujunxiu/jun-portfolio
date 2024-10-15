import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

interface BookProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  link: string;
  title: string;
}

const Book: React.FC<BookProps> = ({ position, rotation, scale, link, title }) => {
  const bookRef = useRef<THREE.Group>(null);
  const { scene: originalScene, animations: originalAnimations } = useGLTF('/models/book/scene.gltf') as unknown as GLTFResult;

  // Clone the scene and animations
  const bookScene = originalScene.clone();
  const bookAnimations = originalAnimations.map(clip => clip.clone());
  const { actions: bookActions } = useAnimations(bookAnimations, bookRef);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track if it's a mobile device
  const [isClicked, setIsClicked] = useState(false); // Track if clicked once for mobile

  // Utility function to detect mobile devices
  const detectMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iPad|iPhone|iPod/.test(userAgent.toLowerCase());
  };

  useEffect(() => {
    setIsMobile(detectMobileDevice());

    if (bookRef.current) {
      bookRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.userData.actions = bookActions;
        }
      });
    }

    const initialAction = bookActions['Animation'];
    if (initialAction) {
      initialAction.play();
      initialAction.paused = true;
      initialAction.time = 0;
    }

    console.log(`Book "${title}" loaded with position: ${position}`);
  }, [bookAnimations, bookActions, position, title]);

  const handlePointerOver = (e: THREE.Event) => {
    if (!isMobile) {  // Only on desktop
      setIsHovered(true);
      triggerAnimation(true);
      console.log('Pointer over book:', title);
    }
  };

  const handlePointerOut = (e: THREE.Event) => {
    if (!isMobile) {  // Only on desktop
      setIsHovered(false);
      triggerAnimation(false);
      console.log('Pointer out of book:', title);
    }
  };

  const handlePointerClick = (e: THREE.Event) => {
    if (isMobile) {
      if (!isClicked) {
        // First tap on mobile shows the animation and text
        setIsHovered(true);
        setIsClicked(true);
        triggerAnimation(false);

        // Auto-hide after 2 seconds (optional for mobile behavior)
        setTimeout(() => {
          setIsHovered(false);
          setIsClicked(true);
          triggerAnimation(true);
        }, 2000);
       
        console.log('First touch on mobile book:', title);
      } else {
        // Second tap on mobile opens the link
        window.open(link, '_blank');
        console.log('Book clicked on mobile:', title);
      }
    } else {
      // On desktop, clicking opens the link immediately
      window.open(link, '_blank');
      console.log('Book clicked on desktop:', title);
    }
  };

  const triggerAnimation = (play: boolean) => {
    const book = bookRef.current;
    if (book) {
      book.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const actions = child.userData.actions as { [key: string]: THREE.AnimationAction };
          if (actions) {
            Object.values(actions).forEach(action => {
              if (play) {
                action.reset().fadeIn(0.5).play(); // Play animation smoothly
              } else {
                action.paused = true;
                action.time = 0;
              }
            });
          }
        }
      });
    }
  };

  return (
    <>
      <primitive
        object={bookScene}
        ref={bookRef}
        position={position}
        scale={scale}
        rotation={rotation}
        onPointerOver={handlePointerOver}  // Desktop: Hover
        onPointerOut={handlePointerOut}    // Desktop: Hover out
        onClick={handlePointerClick}       // Desktop: Click / Mobile: Tap
      />
      {isHovered && (
       <Html position={position}>
       <div className="title text-transparent text-4xl font-bold animate-fadeIn"
         style={{
           backgroundImage: 'linear-gradient(45deg, #ff69b4, #7f00ff)', // Gradient text
           WebkitBackgroundClip: 'text', // Clipping for the gradient text effect
           textShadow: '0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #7f00ff', // Glowing effect
           fontFamily: `'Uncial Antiqua', cursive` // Fantasy font from Google Fonts
         }}
       >
         {title}
       </div>
     
       <style>
         {`
           @keyframes fadeIn {
             0% { opacity: 0; }
             100% { opacity: 1; }
           }
           .animate-fadeIn {
             animation: fadeIn 1s ease-in-out;
           }
         `}
       </style>
     </Html>
     
      )}
    </>
  );
};

export default Book;
