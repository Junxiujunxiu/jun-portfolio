'use client';

import React from 'react';
import { CanvasRevealEffect } from '../../UI/CanvasRevealEffect';
import Card from '../../components/Card';
import AceternityIcon from '../../components/AceternityIcon';

const AboutMe = () => {
  return (
    <section
      className="w-full py-20 text-white"
      style={{
        backgroundImage: `url('/world2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-10">
        <Card
          title="Who I Am"
          icon={<AceternityIcon text="About Me" />}
          des={
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>I'm a dedicated student with strong academic performance.</li>
                <li>I enjoy horror movies, survival games, and experimenting with cooking.</li>
                <li>I’m passionate about cryptocurrency trading and constantly learning new things.</li>
                <li>I believe my diverse interests make me adaptable and open to new challenges.</li>
              </ul>
            </>
          }
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-400 rounded-3xl overflow-hidden"
          />
        </Card>

        <Card
          title="My Journey"
          icon={<AceternityIcon text="My Journey" />}
          des={
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>I started with HTML, CSS, and JavaScript.</li>
                <li>Explored programming with C, C++, and game development using Unreal Engine.</li>
                <li>Realized I needed a structured learning path, leading me to study at AUT.</li>
                <li>Now, I’m growing my skills in software development every day.</li>
              </ul>
            </>
          }
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-purple-600 rounded-3xl overflow-hidden"
            colors={[
              [253, 230, 138],  // Warm yellow (#FDE68A)
              [252, 165, 165],  // Light coral red (#FCA5A5)
            ]}
            dotSize={3}
          />
        </Card>

        <Card
          title="My Passion"
          icon={<AceternityIcon text="My Passion" />}
          des={
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>I’m always exploring new tech stacks and learning new skills.</li>
                <li>I love applying what I learn through building small projects.</li>
                <li>Keeping up with new tools and environments excites me.</li>
                <li>Despite the challenges, I enjoy diving into new technologies and experimenting with them.</li>
              </ul>
            </>
          }
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-indigo-500 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
