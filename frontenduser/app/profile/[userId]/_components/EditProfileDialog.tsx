"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    _id: string;
    bio?: string;
    location?: string;
  };
}

export default function EditProfileDialog({
  open,
  onClose,
  user,
}: EditProfileDialogProps) {
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch(`/sendRequest/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Profile updated successfully");
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <textarea
            className="w-full border p-2 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Update your bio"
          />
          <input
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your location"
          />
          <Button
            className="w-full"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
