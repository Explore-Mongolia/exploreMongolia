"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { 
            duration: 0.3,
            ease: [0.4, 0, 1, 1]
          }
        }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  );
}