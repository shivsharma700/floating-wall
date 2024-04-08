"use client";

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
    socket.on("wall", (data: any) => {
      setLamps((e: any) => [...e, data]);
    });
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
