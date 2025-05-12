import React from 'react';

interface LocationInputProps {
  latitude: string;
  longitude: string;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
}

const LocationInput: React.FC<LocationInputProps> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">Location Coordinates *</label>
      <div className="flex space-x-4 mt-1">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          className="w-1/2 border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          className="w-1/2 border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default LocationInput;
