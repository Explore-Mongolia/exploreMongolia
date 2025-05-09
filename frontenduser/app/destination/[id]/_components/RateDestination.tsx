"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { sendRequest } from "@/lib/SendRequest";

export default function RateDestinationDialog({
  destinationId,
  alreadyRated,
  initialRating,
}: {
  destinationId: string;
  alreadyRated?: boolean;
  initialRating?: number;
}) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState(alreadyRated || false);
  const [loading, setLoading] = useState(false);
  const { mongoUserId } = useUserStore();
  const userId = mongoUserId;

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("You must be logged in to rate.");
      return;
    }

    setLoading(true);
    try {
      await sendRequest.post(`/rating/destination/${destinationId}`, {
        userId,
        rating,
      });
      toast.success("Thanks for your rating!");
      setRated(true);
      setOpen(false);
    } catch (error) {
      console.error("Rating failed", error);
      toast.error("Failed to rate the destination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`transition duration-200 ${
            rated ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={rated}
        >
          {rated ? `Rated (${rating}★)` : "Rate"}
        </Button>
      </DialogTrigger>
      {!rated && (
        <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Rate this destination
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 my-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={36}
                className={`cursor-pointer transition-all duration-200 transform ${
                  star <= (hover || rating) ? "text-yellow-400 scale-110" : "text-gray-400"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                strokeWidth={2}
                fill={star <= (hover || rating) ? "#facc15" : "none"}
              />
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className={`w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 disabled:bg-gray-400 transition duration-200`}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}
