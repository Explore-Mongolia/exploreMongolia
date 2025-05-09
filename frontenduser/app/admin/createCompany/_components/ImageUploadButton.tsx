"use client";

import { CldUploadWidget } from "next-cloudinary";

type Props = {
  onUpload: (url: string) => void;
};

const ImageUploadButton = ({ onUpload }: Props) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-1">Profile Image</label>
    <CldUploadWidget
      uploadPreset="ml_default"
      onSuccess={(results: any) => {
        if (results.info?.secure_url) {
          onUpload(results.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="w-28 h-28 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 text-gray-500 hover:opacity-80 transition"
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  </div>
);

export default ImageUploadButton;
