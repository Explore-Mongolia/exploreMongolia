// components/Hero.tsx

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 lg:px-24 gap-10">
        {/* Left side */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Explore Mongolia <br /> with Confidence
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover hidden gems, plan meaningful trips, and share real travel experiences.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <a
              href="#planner"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Plan a Trip
            </a>
            <a
              href="#experiences"
              className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700"
            >
              View Experiences
            </a>
          </div>
        </div>

        {/* Right image side */}
        <div className="flex-1">
          <Image
            src="https://images.unsplash.com/photo-1571821807771-62cf66ac3f14?w=800&auto=format&fit=crop&q=60"
            alt="Mongolia hero"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
