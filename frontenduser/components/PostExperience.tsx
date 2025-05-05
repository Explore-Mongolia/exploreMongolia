"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

interface PostExperienceDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostExperienceDialog: React.FC<PostExperienceDialogProps> = ({
  open,
  onClose,
}) => {
  const { mongoUserId } = useUserStore();
  const [name, setName] = useState("");
  const [visitedPlaces, setVisitedPlaces] = useState("");
  const [description, setDescription] = useState("");
  const [tips, setTips] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [vibes, setVibes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sendRequest.post("/experience/create", {
        name,
        visitedPlaces,
        description,
        user: mongoUserId,
        tips,
        totalCost,
        highlights,
        tripDates,
        vibes,
      });

      if (response.status === 200) {
        toast.success("Experience submitted successfully");
      } else {
        toast.error("Failed to submit experience");
      }
      onClose();
    } catch (error) {
      toast.error("Error submitting experience:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogTitle>Share Your Travel Experience</DialogTitle>
        <DialogDescription className="mb-4 text-sm text-muted-foreground">
          Give other travelers helpful insights by sharing your real journey.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Experience Name"
            placeholder="Ex: Camel Trekking in the Gobi"
            value={name}
            setValue={setName}
          />
          <InputField
            label="Visited Places"
            placeholder="Ex: Gobi Desert, Yol Valley, Khongor Dunes"
            value={visitedPlaces}
            setValue={setVisitedPlaces}
          />
          <TextareaField
            label="Description"
            placeholder="Describe what you did, saw, and felt."
            value={description}
            setValue={setDescription}
          />
          <TextareaField
            label="Travel Tips"
            placeholder="Any useful advice for future travelers?"
            value={tips}
            setValue={setTips}
          />
          <InputField
            label="Total Cost (USD)"
            placeholder="Ex: 320"
            value={totalCost}
            setValue={setTotalCost}
          />
          <InputField
            label="Trip Highlights"
            placeholder="Ex: Riding camels, stargazing, sand dunes"
            value={highlights}
            setValue={setHighlights}
          />
          <InputField
            label="Trip Dates"
            placeholder="Ex: July 10 - July 20, 2024"
            value={tripDates}
            setValue={setTripDates}
          />
          <InputField
            label="Overall Vibe"
            placeholder="Ex: Peaceful, adventurous, inspiring"
            value={vibes}
            setValue={setVibes}
          />

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Reusable components
const InputField = ({
  label,
  value,
  setValue,
  placeholder = "",
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder={placeholder}
    />
  </div>
);

const TextareaField = ({
  label,
  value,
  setValue,
  placeholder = "",
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      rows={4}
      placeholder={placeholder}
    />
  </div>
);

export default PostExperienceDialog;
