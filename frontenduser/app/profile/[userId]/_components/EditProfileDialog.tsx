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
import { sendRequest } from "@/lib/SendRequest";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    _id: string;
    bio?: string;
    location?: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
}

export default function EditProfileDialog({
  open,
  onClose,
  user,
}: EditProfileDialogProps) {
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [twitter, setTwitter] = useState(user.socialLinks?.twitter || "");
  const [instagram, setInstagram] = useState(user.socialLinks?.instagram || "");
  const [linkedin, setLinkedin] = useState(user.socialLinks?.linkedin || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const res = await sendRequest.put(`/user/${user._id}`, {
        bio,
        location,
        website,
        socialLinks: {
          twitter,
          instagram,
          linkedin,
        },
      });

      if (res.status === 200) {
        toast.success("Profile updated successfully");
        onClose(); 
      }

      throw new Error("Update failed");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isSaving) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <textarea
            className="w-full border p-2 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your bio"
          />
          <input
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your location"
          />
          <input
            className="w-full border p-2 rounded"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Your website"
          />
          <input
            className="w-full border p-2 rounded"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Twitter URL"
          />
          <input
            className="w-full border p-2 rounded"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram URL"
          />
          <input
            className="w-full border p-2 rounded"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn URL"
          />
          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
