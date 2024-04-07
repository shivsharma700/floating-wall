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
  return(
    <div className='bg-white h-screen w-screen'>
    <div
      className="float"
      style={{
        position: 'fixed',
        width: '100px',
        height: '100px',
        transform: `translate(calc(100vw * ${randomX}), calc(100vh * ${randomY}))`,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'transform 5s linear',
      }}
    ><img src="https://media.istockphoto.com/id/1281794049/vector/sky-lantern.jpg?s=612x612&w=0&k=20&c=IG-ZXSS7wgGVqOoUyy3rVFjfDuSNi0zQ2druAAqHwMs=" alt="" /></div>
  </div>
  )
}

export default page