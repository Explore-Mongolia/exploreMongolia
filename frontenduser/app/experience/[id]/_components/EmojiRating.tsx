"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const emojis = ["😲", "🔥", "💖", "✨", "🌟"];
const emojiLabels = ["Wow", "Fire", "Love", "Shiny", "Star"];

export default function InlineEmojiRating({
  experienceId,
}: {
  experienceId: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const { mongoUserId } = useUserStore();

  const handleRating = async (index: number) => {
    if (!mongoUserId) {
      toast.error("Please login to rate.");
      return;
    }

    setSelected(index);

    try {
      await sendRequest.post(`/rating/experience/${experienceId}`, {
        userId: mongoUserId,
        emoji: emojis[index],
      });
      toast.success(`You rated: ${emojiLabels[index]}`);
    } catch (error) {
      toast.error("Failed to submit rating.");
      console.error(error);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-5 mt-5 justify-center items-center">
        {emojis.map((emoji, index) => {
          const isSelected = selected === index;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => handleRating(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-3xl md:text-4xl p-3 rounded-full focus:outline-none relative transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-yellow-200 shadow-xl ring-2 ring-yellow-400"
                        : "hover:bg-gray-100"
                    }`}
                  aria-label={emojiLabels[index]}
                >
                  {emoji}

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -top-3 -right-3 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full shadow"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-sm font-medium shadow border">
                {emojiLabels[index]}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
