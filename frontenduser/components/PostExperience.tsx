"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const schema = yup.object().shape({
  name: yup.string().required("Experience name is required"),
  visitedPlaces: yup.string().required("Visited places are required"),
  description: yup.string().required("Description is required"),
  tips: yup.string().required("Travel tips are required"),
  totalCost: yup.number().positive().required("Total cost is required"),
  highlights: yup.string().required("Trip highlights are required"),
  vibes: yup.string().required("Vibes are required"),
  tripDates: yup.string().optional(),
});

interface PostExperienceDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostExperienceDialog: React.FC<PostExperienceDialogProps> = ({ open, onClose }) => {
  const { mongoUserId } = useUserStore();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    setLoading(true);

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dkaymkcly/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setImages((prev) => [...prev, data.secure_url]);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading image");
    }{
    setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendRequest.post(`/experience/create/?userId=${mongoUserId}`, {
        ...data,
        images,
      });

      if (response.status === 201) {
        toast.success("Experience submitted successfully");
        onClose();
      } else {
        toast.error("Failed to submit experience");
      }
    } catch (error) {
      toast.error("Error submitting experience");
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

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
           file:rounded-full file:border-0 file:text-sm file:font-semibold
           file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
         {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Uploading Image
          </>
        ) : (
          "Upload Image"
        )}
        {images.length === 0 && !loading &&(
          <p className="text-sm text-red-500 mt-1">* At least one image is required</p>
        )}
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`upload-${index}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField label="Experience Name" name="name" control={control} error={errors.name?.message} />
          <InputField label="Visited Places" name="visitedPlaces" control={control} error={errors.visitedPlaces?.message} />
          <TextareaField label="Description" name="description" control={control} error={errors.description?.message} />
          <TextareaField label="Travel Tips" name="tips" control={control} error={errors.tips?.message} />
          <InputField label="Total Cost (USD)" name="totalCost" control={control} error={errors.totalCost?.message} />
          <InputField label="Trip Highlights" name="highlights" control={control} error={errors.highlights?.message} />

          {/* Vibes Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Overall Vibe</label>
            <Controller
              name="vibes"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a vibe...</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Relaxing">Relaxing</option>
                  <option value="Nature-filled">Nature-filled</option>
                  <option value="Luxury">Luxury</option>
                </select>
              )}
            />
            {errors.vibes && <p className="text-sm text-red-500 mt-1">{errors.vibes.message}</p>}
          </div>

          <InputField label="Trip Dates (optional)" name="tripDates" control={control} error={errors.tripDates?.message} />

          {/* Submit Buttons */}
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
              disabled={isSubmitting || images.length === 0}
              className={`px-4 py-2 text-white rounded ${
                images.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  name,
  control,
  error,
}: {
  label: string;
  name: string;
  control: any;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

// Reusable Textarea Field
const TextareaField = ({
  label,
  name,
  control,
  error,
}: {
  label: string;
  name: string;
  control: any;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          {...field}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      )}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default PostExperienceDialog;
