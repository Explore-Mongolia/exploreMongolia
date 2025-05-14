"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { ImagesSlider } from "@/components/ui/images-slider";

const Hero = () => {
  const images = [
    "https://www.toursmongolia.com/uploads/mongolia-naadam-photography_toursmongolia.jpg",
    "https://www.toursmongolia.com/uploads/best_time_to_travel_mongolia.jpg",
    "https://www.toursmongolia.com/uploads/Adventures%20in%20Altai%20Mountains%20Mongolia%20Tour.jpg",
  ];

  return (
    <ImagesSlider images={images} className="h-screen relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-transparent z-10 backdrop-brightness-90"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 flex flex-col justify-center items-center h-full px-6 text-center max-w-3xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Discover Mongolia's{" "}
          <span className="text-blue-600">Hidden Wonders</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-800 mt-4 mb-8"
        >
          Your gateway to authentic experiences, from the Gobi Desert to the
          Altai Mountains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 z-30"
        >
          <Button
            asChild
            size="lg"
            className="text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <Link href="/sign-up" className="flex items-center gap-2">
              Start Your Journey
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
        </motion.div>
      </motion.div>
    </ImagesSlider>
  );
};

export default Hero;
