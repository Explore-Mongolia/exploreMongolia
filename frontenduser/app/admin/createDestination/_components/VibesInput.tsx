import React from 'react';

interface VibesInputProps {
  vibesAvailable: string[];
  setVibesAvailable: React.Dispatch<React.SetStateAction<string[]>>;
}

const VibesInput: React.FC<VibesInputProps> = ({ vibesAvailable, setVibesAvailable }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">Vibes Available</label>
      <input
        type="text"
        placeholder="Enter vibes (comma separated)"
        value={vibesAvailable.join(", ")}
        onChange={(e) => setVibesAvailable(e.target.value.split(",").map((v) => v.trim()))}
        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default VibesInput;
