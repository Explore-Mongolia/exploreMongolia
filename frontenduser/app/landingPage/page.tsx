"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import Stats from "./_components/Stats";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function LandingPage() {
  const slides = [
    {
      title: "Gobi Desert",
      description: "Camel rides across golden dunes await you.",
      image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1600",
    },
    {
      title: "Altai Mountains",
      description: "Breathtaking hikes through ancient landscapes.",
      image:
        "https://images.unsplash.com/photo-1602747619526-8cbb70eb7e8f?q=80&w=1600",
    },
    {
      title: "Lake Khövsgöl",
      description: "Experience Mongolia's deepest freshwater lake.",
      image:
        "https://images.unsplash.com/photo-1623435565795-6ea5c3ea7805?q=80&w=1600",
    },
  ];

  const mongolianSlides = [
    {
      title: "Gobi Desert",
      description: "Explore the vast golden dunes of the Gobi Desert.",
      image:
        "https://plus.unsplash.com/premium_photo-1673415819365-3a074887b666?w=2400&auto=format&fit=crop&q=85&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29iaSUyMGRlc2VydHxlbnwwfHwwfHx8MA%3D%3D",
      blurDataURL:
        "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwAgCdASoQABAAAgA0JbACdLoA/u4AAA==", // Tiny placeholder
    },
    {
      title: "Khövsgöl Lake",
      description:
        "Crystal clear waters of Mongolia's largest freshwater lake.",
      image:
        "https://images.unsplash.com/photo-1664770427537-f24e362b0c30?w=2664&auto=format&fit=crop&q=85&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      blurDataURL:
        "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAABQAgCdASoQABAAAgA0JbACdLoA/u4AAA==",
    },
    {
      title: "Terelj National Park",
      description: "Stunning rock formations and lush valleys.",
      image:
        "https://images.unsplash.com/photo-1553267870-e92627117826?w=2400&auto=format&fit=crop&q=85&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVyZWxqfGVufDB8fDB8fHww",
      blurDataURL:
        "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAgCdASoQABAAAgA0JbACdLoA/u4AAA==",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Full-width Hero Carousel */}
      <section className="w-full h-screen">
        <Carousel
          className="w-full h-screen"
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {mongolianSlides.map((slide, index) => (
              <CarouselItem key={index} className="w-full h-screen">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index < 2} 
                    quality={85}
                    placeholder="blur"
                    blurDataURL={slide.blurDataURL}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 2000px"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
                    <motion.h1
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl sm:text-6xl font-bold mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-lg sm:text-xl mb-8 max-w-2xl"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
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
                        className="bg-transparent text-white hover:bg-white hover:text-gray-900 border-white"
                      >
                        <Link href="/sign-in">Log in</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Stats */}
      <Stats />

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
                  className="bg-transparent text-gray-900 hover:bg-gray-100 border-gray-300 transition"
                >
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
