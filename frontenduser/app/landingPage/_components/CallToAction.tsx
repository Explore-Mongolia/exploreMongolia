"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const CallToAction = () => {
  return (
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-900 hover:bg-white transition"
              >
                <Link href="/sign-in">Log in</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
