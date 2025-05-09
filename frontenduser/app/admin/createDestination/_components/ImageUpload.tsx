import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1">Image Upload</label>
      <CldUploadWidget
        uploadPreset="ml_default"
        onSuccess={(results: any) => {
          if (results.info?.secure_url) {
            setImage(results.info.secure_url);
          }
        }}
      >
        {({ open }) => (
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => open()}
              className="relative w-full h-28 overflow-hidden border-2 border-gray-300 shadow-md hover:opacity-80 transition rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
            >
              {image ? (
                <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
              ) : (
                "Upload"
              )}
            </button>
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
