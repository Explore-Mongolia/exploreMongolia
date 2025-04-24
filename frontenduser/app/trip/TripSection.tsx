"use client";
import React from "react";

export default function TripSection() {
  return (
    <section id="Travel" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Travel Destinations</h2>
        <p className="text-center text-lg text-gray-600">
          Explore breathtaking places across Mongolia from the Gobi Desert to Khuvsgul Lake.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Gobi Desert</h3>
            <p>Sand dunes, dinosaur fossils, and camel rides await in this vast, stunning desert.</p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Khuvsgul Lake</h3>
            <p>Often called the “Blue Pearl”, it's perfect for kayaking, hiking, and connecting with nature.</p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Altai Mountains</h3>
            <p>Home to eagle hunters, glaciers, and breathtaking hikes in Mongolia's west.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
