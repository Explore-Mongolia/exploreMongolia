
"use client";

import { useState } from "react";
import { SquarePen } from "lucide-react";
import PostExperienceDialog from "./PostExperience";

const PostIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-50 group">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all duration-200 group-hover:bg-blue-700"
      >
        <SquarePen className="h-6 w-6 transform transition-transform duration-200 group-hover:scale-110 cursor-pointer" />
      </button>

      <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm text-blue-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        Post Experience
      </div>

      <PostExperienceDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PostIcon;
