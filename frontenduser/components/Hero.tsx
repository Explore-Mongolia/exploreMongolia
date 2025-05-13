"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FlipWords } from "./ui/flip-words";

const images = [
    "https://images.unsplash.com/photo-1571821807771-62cf66ac3f14?w=1920&q=100",
    // "https://assets.bucketlistly.blog/...hd-op.jpg", // already HD
    "https://images.unsplash.com/photo-1535219241072-7d3c28a49a5c?w=1920&q=100",
    "https://images.unsplash.com/photo-1708873395735-dcad0140e3a2?w=1920&q=100"

  
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const confidenceWords = ["Confidence", "Adventure", "Ease", "Excitement"];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {images.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Mongolia background ${idx}`}
          fill
          priority={idx === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Hero content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          Explore Mongolia with <br />
          <FlipWords words={confidenceWords} />
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
          Discover hidden gems, plan meaningful trips, and share real travel experiences.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollToSection("planner")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Plan a Trip
          </button>
          <button
            onClick={() => scrollToSection("experiences")}
            className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition"
          >
            View Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
