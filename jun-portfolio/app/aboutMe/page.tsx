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
              I'm a hardworking person, and I’ve achieved good grades throughout my degree.<br />
              When I'm not focusing on my studies, you can find me enjoying a good horror movie, playing zombie survival games, or experimenting with new recipes in the kitchen.<br />
              I'm also passionate about cryptocurrency trading.<br />
              I’m always looking for opportunities to learn and grow, both academically and personally, and I believe that my diverse background and interests make me adaptable and open-minded in various situations.
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
                My journey as a developer began with a fascination for HTML, CSS, and JavaScript.
                I found it incredibly exciting to see how a few lines of code could transform a website.<br />
                This curiosity led me to explore free courses on YouTube, where I dived into various programming languages like C and C++. I even tried my hand at Unreal Engine, attempting to build a small game.While I enjoyed creating the game logic, I hit a wall with static meshes and animations, so I paused that project for a while.<br />
                From there, I explored Android Studio, and it became clear that I needed a more structured approach to my learning.<br />
                That’s when I decided to enroll in the Bachelor of Computer and Information Science program at Auckland University of Technology, where I’m now refining my skills and expanding my knowledge every day.
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
                I am passionate about exploring new tech stacks and constantly diving into tutorials to learn something new.<br /><br />
                I love taking what I learn and building small projects to apply my skills.<br />
                Whether it's reading about the latest advancements in technology or experimenting with new tools and environments, I’m always excited to expand my knowledge.<br /><br />
                Even though it can be overwhelming to keep up with so many languages and frameworks, I truly enjoy the process of downloading new environments and exploring what they can do.
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
