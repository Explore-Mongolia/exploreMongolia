import React from 'react';

interface CostInputProps {
  cost: string;
  currency: string;
  setCost: React.Dispatch<React.SetStateAction<string>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CostInput: React.FC<CostInputProps> = ({ cost, currency, setCost, setCurrency }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">Cost</label>
      <div className="flex items-center space-x-2 mt-1">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded-md px-2 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="¥">¥ (JPY)</option>
          <option value="₽">₽ (RUB)</option>
          <option value="元">元 (CNY)</option>
          <option value="₩">₩ (KRW)</option>
        </select>

        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            {currency}
          </span>
          <input
            type="text"
            placeholder="0.00"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            className="w-full border rounded-md pl-7 pr-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default CostInput;
