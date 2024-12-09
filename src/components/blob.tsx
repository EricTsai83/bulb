"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const Bulb = () => {
  const [isOn, setIsOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    setIsOn(!isOn);
    if (audioRef.current) {
      setTimeout(() => {
        audioRef.current!.currentTime = 0;
        audioRef.current!.play().catch((error) => {
          console.log("Audio play failed:", error);
        });
      }, 50); // 50ms 延遲
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isOn
          ? "bg-gradient-radial from-neutral-600 to-neutral-900"
          : "bg-neutral-800"
      }`}
    >
      <div className="relative">
        {/* Wire */}
        <div className="fixed top-0 left-[calc(50%-3.5px)] w-1 h-[calc(50vh-70px)] bg-black"></div>

        {/* Blob */}
        <div className="relative z-20">
          <Image
            src="/blob.png"
            alt="Blob"
            width={120}
            height={120}
            className={isOn ? "brightness-125 filter" : "brightness-50 filter"}
          />

          {/* Light Glow Effect */}
          {isOn && (
            <div className="pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/15 blur-[35px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-white/20 blur-[30px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-white/25 blur-[25px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-white/30 blur-[20px]"></div>
            </div>
          )}
        </div>

        {/* Switch */}
        <div className="absolute -bottom-[120px] left-1/2 -translate-x-1/2 w-20 h-20 rounded-[10px] border-3 border-black bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 flex justify-center items-center">
          <div
            onClick={handleClick}
            className="relative w-[25px] h-[40px] rounded-[6px] border-2 border-neutral-800 bg-gradient-to-b from-gray-600 via-white to-gray-600 cursor-pointer"
          >
            <div
              className={`absolute w-full rounded-[4px] bg-gradient-to-b from-white to-white
              ${isOn ? "h-[85%] top-[15%]" : "h-[85%] top-0"}`}
            ></div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/click.mp3" className="hidden" />
    </div>
  );
};

export default Bulb;
