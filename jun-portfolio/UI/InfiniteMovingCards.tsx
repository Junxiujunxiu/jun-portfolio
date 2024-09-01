'use client';

import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  speed = 'fast',
  direction = 'left', // Add a direction prop
  className,
}: {
  items: {
    text: string;
  }[];
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right'; // Define the direction prop type
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null); 
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      // Duplicate items enough times to create a seamless infinite loop
      const numDuplicates = Math.ceil(window.innerWidth / scrollerRef.current.scrollWidth) + 1;
      for (let i = 0; i < numDuplicates; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }
      setStart(true);
    }
  }, []);

  useEffect(() => {
    if (start) {
      getSpeed();
    }
  }, [start, speed]);

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === 'fast'
          ? '10s'
          : speed === 'normal'
          ? '40s'
          : '80s';
      containerRef.current.style.setProperty('--animation-duration', duration);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left var(--animation-duration) linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right var(--animation-duration) linear infinite;
        }

        .scroll-container {
          display: flex;
          min-width: 100%; 
          width: max-content; 
        }
      `}</style>
      <div className={`space-y-6 ${className}`}>
        <div
          ref={containerRef}
          className={`scroller relative z-20 w-screen overflow-hidden`}
        >
          <ul
            ref={scrollerRef}
            className={`scroll-container flex gap-4 py-4 w-max flex-nowrap ${
              start && (direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right')
            }`}
            style={{
              animationDuration: 'var(--animation-duration)',
            }}
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                className="w-[300px] max-w-full relative rounded-md border border-gray-300 shadow-lg flex-shrink-0 p-4"
                style={{
                  background: 'rgb(24,24,24)',
                  backgroundColor: 'linear-gradient(90deg, rgba(24,24,24,1) 0%, rgba(36,36,36,1) 100%)',
                }}
              >
                <p className="text-white text-sm">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
