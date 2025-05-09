import React from "react";

type FormTextareaProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
};

const FormTextarea = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
}: FormTextareaProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full border rounded-md px-3 py-2 mt-1 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default FormTextarea;
