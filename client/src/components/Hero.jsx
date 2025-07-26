import React from "react";
import HeroPic from "../assets/hero.jpg";

function Hero() {
  return (
    <div
      className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${HeroPic})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-sawarabi drop-shadow-lg">
          Welcome to Sushi House
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
          Fresh, Authentic, At Home
        </p>
      </div>
    </div>
  );
}

export default Hero;
