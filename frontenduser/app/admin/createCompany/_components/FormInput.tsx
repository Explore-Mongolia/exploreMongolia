import React from "react";

type FormInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const FormInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: FormInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default FormInput;
