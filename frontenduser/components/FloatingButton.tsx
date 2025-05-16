"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostExperienceDialog from "./PostExperience";
import { useUserStore } from "@/store/userStore";
import { IconLayoutGrid } from "@tabler/icons-react";

export default function FloatingHoverActions() {
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { mongoUserId } = useUserStore();
  const userId = mongoUserId;

  return (
    <div
      className="relative w-fit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button
        className="
    rounded-full 
    px-5 py-2.5 text-sm
    md:px-6 md:py-3 md:text-base
    lg:px-7 lg:py-3.5 lg:text-lg
    bg-blue-600 text-white 
    hover:bg-blue-700
    flex items-center justify-center
"
      >
        <IconLayoutGrid className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
      </Button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-[-110px] left-1/2 -translate-x-1/2 flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => router.push(`/profile/${userId}`)}
              className="bg-white text-black hover:bg-gray-100 rounded-full"
            >
              Go to Profile
            </Button>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-white text-black hover:bg-gray-100 rounded-full"
            >
              Post Experience
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog */}
      <PostExperienceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
