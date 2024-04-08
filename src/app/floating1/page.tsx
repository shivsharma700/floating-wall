"use client";
import Lamp from "@/components/Lamp";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import gsap from "gsap";
import welcome from "../../../public/assets/welcom.png";
const socket = io("https://mosaic-api.gokapturehub.com", {
  transports: ["websocket"],
});

const Page: React.FC = () => {
  const [lamps, setLamps] = useState<any>([]);
  const [showWelcome, setShowWelcome] = useState(true); // State to control the visibility of welcome image

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("wall", (data: any) => {
      setLamps((prevLamps: any) => [...prevLamps, data]);
    });

    // Event listener to handle "R" key press
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "r") {
        setShowWelcome(true); // Show welcome image
      }
    };

    // Add event listener
    document.addEventListener("keypress", handleKeyPress);

    // Cleanup function
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const getLamps = async () => {
      const res = await axios.get("https://api.gokapturehub.com/wall-test");
      setLamps(res.data.data);
    };

    getLamps();

    let timer: NodeJS.Timeout;

    timer = setInterval(() => {
      const randomLamps = Array.from({ length: 2 }, () => ({
        feedback: "",
        name: "",
      }));
      setLamps((prevLamps: any) => [...prevLamps, ...randomLamps]);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Animation to hide welcome image after 3 seconds
    if (showWelcome) {
      gsap.to(".welcome", { opacity: 0, duration: 10, onComplete: () => setShowWelcome(false) });
    }
  }, [showWelcome]);

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-[url('/assets/bg.png')] relative overflow-hidden">
      {/* Conditional rendering of welcome image */}
      {showWelcome && (
        <img src={welcome.src} className="welcome" alt="Welcome" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }} />
      )}
      {lamps.map((lamp: any, i: number) => (
        <Lamp key={i} feedback={lamp.feedback} name={lamp.name} />
      ))}
    </div>
  );
};

export default Page;
