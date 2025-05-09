import React from 'react';

interface CompanySelectProps {
  company: string;
  companies: any[];
  setCompany: React.Dispatch<React.SetStateAction<string>>;
}

const CompanySelect: React.FC<CompanySelectProps> = ({ company, companies, setCompany }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">Select Company *</label>
      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="" disabled>Select a company...</option>
        {companies.map((comp) => (
          <option key={comp._id} value={comp._id}>
            {comp.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanySelect;
