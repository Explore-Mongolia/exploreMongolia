"use client";

import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";

const emojis = ["🔥", "💖", "😲", "🌟"];

export default function InlineEmojiRating({
  experienceId,
  reactions,
}: {
  experienceId: string;
  reactions: any[];
}) {
  const userId = useUserStore((state) => state.mongoUserId);
  const queryClient = useQueryClient();

  const userReaction = reactions.find((r) => r.user === userId)?.emoji || null;

  const [localEmoji, setLocalEmoji] = useState<string | null>(null); 

  const currentReaction = localEmoji || userReaction;

  const combinedCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const r of reactions) {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    }

    
    if (localEmoji && localEmoji !== userReaction) {
      if (userReaction) counts[userReaction] = Math.max((counts[userReaction] || 1) - 1, 0);
      counts[localEmoji] = (counts[localEmoji] || 0) + 1;
    }

    return counts;
  }, [reactions, localEmoji, userReaction]);

  const mutation = useMutation({
    mutationFn: (emoji: string) =>
      sendRequest.post(`/rating/experience/${experienceId}`, { userId, emoji }),
    onMutate: (emoji) => {
      if (emoji !== currentReaction) {
        setLocalEmoji(emoji);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience", experienceId] });
    },
  });

  const handleClick = (emoji: string) => {
    if (emoji === currentReaction) return; 
    mutation.mutate(emoji);
  };

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {emojis.map((emoji) => {
        const isUserReaction = emoji === currentReaction;
        return (
          <button
            key={emoji}
            onClick={() => handleClick(emoji)}
            className={`px-3 py-1 rounded-full text-xl border transition 
              ${isUserReaction ? "bg-green-200 border-green-500" : "bg-gray-100 border-gray-300 hover:scale-105"}`}
          >
            {emoji} {combinedCounts[emoji] || 0}
          </button>
        );
      })}
    </div>
  );
}
