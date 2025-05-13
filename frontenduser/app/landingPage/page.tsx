// app/landing/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RocketIcon, MapPinnedIcon, StarIcon, UsersIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-yellow-100 to-blue-100">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
          Explore Mongolia Like Never Before
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover hidden gems, plan unforgettable adventures, and learn from real traveler experiences — all in one place.
        </p>
        <Button asChild size="lg">
          <Link href="/sign-up">Start Your Journey</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Explore Mongolia?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div>
            <RocketIcon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">AI Trip Generator</h3>
            <p className="text-sm text-gray-600">Instantly create custom travel plans based on your interests.</p>
          </div>
          <div>
            <MapPinnedIcon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Local Destination Guide</h3>
            <p className="text-sm text-gray-600">Explore authentic Mongolian places curated by locals.</p>
          </div>
          <div>
            <StarIcon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Community Reviews</h3>
            <p className="text-sm text-gray-600">Read honest reviews and ratings from fellow travelers.</p>
          </div>
          <div>
            <UsersIcon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Share Experiences</h3>
            <p className="text-sm text-gray-600">Post your adventures and inspire the travel community.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div>
            <h4 className="font-semibold text-xl">1. Sign Up</h4>
            <p className="text-gray-600">Create an account to personalize your travel journey.</p>
          </div>
          <div>
            <h4 className="font-semibold text-xl">2. Generate & Customize</h4>
            <p className="text-gray-600">Use our AI to generate trips, or create one manually.</p>
          </div>
          <div>
            <h4 className="font-semibold text-xl">3. Explore & Connect</h4>
            <p className="text-gray-600">Find travel tips, reviews, and connect with others.</p>
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What Travelers Are Saying</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
          <blockquote className="bg-white p-4 rounded shadow">
            “The AI trip planner saved me so much time! My trip to the Gobi was unforgettable.”<br />
            <span className="block text-xs text-gray-500 mt-2">— Alex M.</span>
          </blockquote>
          <blockquote className="bg-white p-4 rounded shadow">
            “I loved being able to see real photos and experiences from other travelers.”<br />
            <span className="block text-xs text-gray-500 mt-2">— Bataa</span>
          </blockquote>
          <blockquote className="bg-white p-4 rounded shadow">
            “Finally a platform focused on Mongolia! Super easy to use and well designed.”<br />
            <span className="block text-xs text-gray-500 mt-2">— Enkhee S.</span>
          </blockquote>
        </div>
      </section>

      {/* Feed Preview */}
      <section className="py-16 bg-blue-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Real Travel Stories</h2>
        <p className="text-center text-gray-700 mb-8">
          See what others are exploring and get inspired.
        </p>
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          {/* Add actual experience feed cards later */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg text-blue-700 mb-2">Journey to Khuvsgul</h3>
            <p className="text-sm text-gray-600">“Kayaked across crystal waters and stayed in a yurt by the lake.”</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg text-blue-700 mb-2">Horseback Across the Steppe</h3>
            <p className="text-sm text-gray-600">“Camped under the stars and rode for days across open land.”</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-blue-200 to-yellow-100">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-gray-700 mb-8">
          Join our community and start planning your next trip in Mongolia.
        </p>
        <Button asChild size="lg">
          <Link href="/sign-up">Create Your Account</Link>
        </Button>
      </section>
    </div>
  );
}
