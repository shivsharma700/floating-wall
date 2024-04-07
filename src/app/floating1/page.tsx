"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const lampImages = [
  '/assets/lamp1.png',
  '/assets/lamp2.png',
  '/assets/lamp3.png'
];

function randomXaxis(){
    return Math.random() * 80;
}

const Page: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const floatingDiv = divRef.current;

    const animateDiv = () => {
      const tl = gsap.timeline({ repeat: 0 });

      tl.to(floatingDiv, {
        css: { top: '-44%', left: () => `${randomXaxis()}vw` },
        duration: 15,
        ease: 'none',
        onStart: () => {
          const randomIndex = Math.floor(Math.random() * lampImages.length);
          floatingDiv.style.backgroundImage = `url(${lampImages[randomIndex]})`;
        }
      })

      return () => {
        tl.kill();
      };
    };

    const animation = animateDiv();

    return () => animation();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-[url('/assets/bg.png')] relative overflow-hidden">
      <div
        ref={divRef}
        className="absolute text-white bottom-[-40vh]  flex flex-col justify-center items-center bg-cover h-[20rem] w-[16rem] "
        style={{ backgroundImage: `url(${lampImages[0]})`, left: `${randomXaxis()}vw` }}
      >
        <div className=" text-lg font-bold">NAME</div>
        <div >message</div>
      </div>
    </div>
  );
};

export default Page;
