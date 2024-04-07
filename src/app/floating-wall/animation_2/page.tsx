"use client"
import './animation_2.css'
import { useEffect, useState } from 'react';

const page = () => {
  const [randomX, setRandomX] = useState(0);
  const [randomY, setRandomY] = useState(0);
  useEffect(() => {
    const updatePosition = () => {
      const newX = Math.random();
      const newY = Math.random();
      setRandomX(newX);
      setRandomY(newY);
    };
    updatePosition();
    const interval = setInterval(updatePosition, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='bg-white h-screen w-screen'>
      <div
        className="float"
        style={{
          position: 'fixed',
          width: '300px',
          height: '300px',
          transform: `translate(calc(100vw * ${randomX}), calc(100vh * ${randomY}))`,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'transform 8s linear',
        }}
      >
        <div className='relative'>
        <img src="/assets/lamp1.png" alt="" />
        <p className='absolute top-[30%] left-[30%] text-5xl'>BINDU</p>
            <p className='absolute top-[50%] left-[30%] text-3xl'>It's Litt</p>
        </div>
      </div>
      <div
        className="float"
        style={{
          position: 'fixed',
          right:0,
          width: '400px',
          height: '400px',
          transform: `translate(calc(50vw *-1* ${randomX}), calc(50vh * ${randomY}))`,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'transform 12s linear',
        }}
      ><div className='relative'>
      <img src="/assets/lamp2.png" alt="" />
      <p className='absolute top-[30%] left-[30%] text-5xl'>TANVI</p>
          <p className='absolute top-[50%] left-[30%] text-3xl'>Good Vibes</p>
      </div>
      </div>
      <div
        className="float"
        style={{
          position: 'fixed',
          right:0,
          bottom:0,
          width: '350px',
          height: '350px',
          transform: `translate(calc(75vw *-0.5* ${randomX}), calc(75vh *-0.5* ${randomY}))`,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'transform 16s linear',
        }}
      ><div className='relative'>
      <img src="/assets/lamp3.png" alt="" />
      <p className='absolute top-[30%] left-[30%] text-5xl'>APOORVA</p>
          <p className='absolute top-[50%] left-[30%] text-3xl'>Feel Good</p>
      </div>
      </div>
    </div>
  )
}

export default page