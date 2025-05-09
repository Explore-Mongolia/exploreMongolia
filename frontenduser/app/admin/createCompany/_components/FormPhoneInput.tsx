import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type FormPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const FormPhoneInput = ({
  value,
  onChange,
  placeholder = "Enter phone number",
}: FormPhoneInputProps) => {
  const handlePhoneChange = (phone: string | undefined) => {
    onChange(phone || ""); 
  };

  return (
    <div>
      <PhoneInput
        international
        value={value}
        onChange={handlePhoneChange} 
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default FormPhoneInput;
