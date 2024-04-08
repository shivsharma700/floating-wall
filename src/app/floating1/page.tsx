'use client'
import Lamp from "@/components/Lamp";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://mosaic-api.gokapturehub.com", {
  transports: ["websocket"],
});

const Page: React.FC = () => {
  const [lamps, setLamps] = useState<any>([]);
  
  useEffect(() => {
    const getLamps = async () => {
      const res = await axios.get("https://api.gokapturehub.com/wall-test");
      setLamps(res.data.data);
    };
    
    getLamps();
    
    let timer: NodeJS.Timeout;
    socket.on("wall", (data: any) => {
      clearTimeout(timer); 
      setLamps((prevLamps: any) => [...prevLamps, data]);
      timer = setTimeout(() => {
        const randomLamps = Array.from({ length: 5 }, () => ({
          feedback: Math.random() > 0.5 ? "good" : "bad",
          name: "Random Lamp",
        }));
        setLamps((prevLamps: any) => [...prevLamps, ...randomLamps]);
      }, 15000);
    });

    timer = setTimeout(() => {
      const randomLamps = Array.from({ length: 5 }, () => ({
        feedback: "",
        name: "",
      }));
      setLamps((prevLamps: any) => [...prevLamps, ...randomLamps]);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-[url('/assets/bg.png')] relative overflow-hidden">
      {lamps.map((lamp: any, i: number) => (
        <Lamp key={i} feedback={lamp.feedback} name={lamp.name} />
      ))}
    </div>
  );
};

export default Page;
