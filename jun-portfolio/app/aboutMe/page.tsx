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
          des="I am a passionate developer with a love for creating immersive web experiences. 
          My journey in tech began with a curiosity for how things work and has evolved into a 
          deep commitment to building applications that make a difference."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </Card>
        <Card
          title="My Journey"
          icon={<AceternityIcon text="My Journey" />}
          des="My journey as a developer started with a simple curiosity and has grown into a 
          fulfilling career. I have honed my skills through countless projects, each teaching 
          me something new and valuable."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title="My Passion"
          icon={<AceternityIcon text="My Passion" />}
          des="I am passionate about technology and the endless possibilities it offers. 
          From front-end design to back-end architecture, I strive to create applications 
          that are not only functional but also enjoyable to use."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
