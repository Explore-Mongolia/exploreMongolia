"use client";
import { motion } from "framer-motion";
import React from "react";

export default function HomeSection() {
  return (
    <motion.section
      id="Home"
      className="py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome to Explore Mongolia</h2>
        <p className="text-center text-lg text-gray-600">
          Discover the beauty, history, and adventure of Mongolia..
        </p>
      </div>
    </motion.section>
  );
}
