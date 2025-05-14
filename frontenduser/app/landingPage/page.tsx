"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RocketIcon,
  MapPinnedIcon,
  StarIcon,
  UsersIcon,
  ChevronRightIcon,
} from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      icon: RocketIcon,
      title: "AI Trip Generator",
      description:
        "Instantly create custom travel plans based on your interests.",
    },
    {
      icon: MapPinnedIcon,
      title: "Local Destination Guide",
      description: "Explore authentic Mongolian places curated by locals.",
    },
    {
      icon: StarIcon,
      title: "Community Reviews",
      description: "Read honest reviews and ratings from fellow travelers.",
    },
    {
      icon: UsersIcon,
      title: "Share Experiences",
      description: "Post your adventures and inspire the travel community.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Planning my Gobi trip used to be overwhelming. The AI planner gave me a full itinerary in minutes. It was actually fun!",
      name: "Alex M.",
      designation: "Adventure Seeker from Canada",
      src: "https://images.unsplash.com/photo-1632812452083-72d3c8abe533?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbGVyfGVufDB8fDB8fHww",
    },
    {
      quote:
        "Seeing reviews and real experiences from other travelers helped me choose the right places and avoid tourist traps.",
      name: "Alex Kim",
      designation: "Traveler & Photographer, Seoul",
      src: "https://plus.unsplash.com/premium_photo-1677442691772-99df9fdc076e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      quote:
        "There's finally a modern travel tool for Mongolia. It helped me find a local company I'd never have discovered on Google.",
      name: "David Stern",
      designation: "Nomadic Spirit, Germany",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-yellow-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=2098&auto=format&fit=crop')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Discover Mongolia's{" "}
              <span className="text-blue-600">Hidden Wonders</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0"
            >
              Your gateway to authentic experiences, from the Gobi Desert to the
              Altai Mountains.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg"
              >
                <Link href="/sign-up" className="flex items-center">
                  Start Your Journey{" "}
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 transition"
              >
                <Link href="/sign-in">Log in</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-2xl opacity-30 blur-lg"></div>
            <img
              src="https://plus.unsplash.com/premium_photo-1700590340809-28fa0ee78ff6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9uZ29saWF8ZW58MHx8MHx8fDA%3D"
              alt="Explore Mongolia"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Your Complete Mongolia Travel Companion
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything you need to plan, experience, and share your Mongolian
            adventure
          </p>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="text-center bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-6xl mx-auto bg-gray-50 rounded-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full mb-4">
            Traveler Stories
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Loved by Adventurers Worldwide
          </h2>
        </motion.div>
        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </section>

      {/* Stats */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Local Guides</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">1.2K</div>
              <div className="text-blue-100">Authentic Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Positive Reviews</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-28 px-6 text-center bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4">
              Ready to Explore?
            </span>
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
              Begin Your Mongolian Adventure Today
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              Join thousands of travelers who've discovered the magic of
              Mongolia with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg"
                >
                  <Link href="/sign-up" className="flex items-center">
                    Sign up <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-white transition"
                ></Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
