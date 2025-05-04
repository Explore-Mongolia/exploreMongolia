"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { sendRequest } from "@/lib/SendRequest";

export default function RateDestinationDialog({ destinationId }: { destinationId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState(false);
  const { mongoUserId } = useUserStore();
    const userId = mongoUserId;


  const handleSubmit = async () => {
    if (!userId) {
      toast.error("You must be logged in to rate.");
      return;
    }

    try {
      await sendRequest.post(`/rating/destination/${destinationId}`, {
        userId,
        rating,
      });
      toast.success("Thanks for your rating!");
      setOpen(false);
    } catch (error) {
      console.error("Rating failed", error);
      toast.error("Failed to rate the destination.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Rate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate this destination</DialogTitle>
        </DialogHeader>
        <div className="flex gap-1 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              strokeWidth={2}
              fill={star <= (hover || rating) ? "#facc15" : "none"}
            />
          ))}
        </div>
        <Button onClick={handleSubmit} disabled={rating === 0}>
          Submit Rating
        </Button>
      </DialogContent>
    </Dialog>
  );
}
