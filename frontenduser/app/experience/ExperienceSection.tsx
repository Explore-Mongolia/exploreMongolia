"use client";
import React from "react";

export default function ExperienceSection() {
  return (
    <section id="Experience" className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Mongolian Experiences</h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Immerse yourself in traditional nomadic culture, local food, and epic landscapes.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Nomadic Lifestyle</h3>
            <p>Live with a nomadic family and learn how to ride horses, herd animals, and more.</p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Ger Camp Stay</h3>
            <p>Stay in a traditional ger (yurt) under the starry skies of the Mongolian steppe.</p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Cultural Festivals</h3>
            <p>Join the Naadam Festival or local Tsagaan Sar celebrations for an authentic experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
