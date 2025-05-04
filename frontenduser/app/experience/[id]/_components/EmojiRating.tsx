"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";

const emojis = ["😡", "❤️", "😐", "😊", "🤩"];
const emojiLabels = ["Angry", "Disappointed", "Neutral", "Happy", "Awesome"];

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
    <div className="flex gap-3 mt-2">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => handleRating(index)}
          className={`text-2xl transition-transform hover:scale-125 ${
            selected === index ? "scale-125" : "opacity-70 hover:opacity-100"
          }`}
          title={emojiLabels[index]}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
