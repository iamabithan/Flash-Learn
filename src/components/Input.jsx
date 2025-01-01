import React, { useState } from 'react';
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const InputField = ({ type = 'text', name, placeholder, value, onChange, onBlur, error }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Determine the input type dynamically based on state
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-4 relative">
      {/* Input field */}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 
          transition-colors duration-300 ease-in-out ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
          }`}
      />

      {/* Eye icon for password visibility */}
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 "
        >
          {showPassword ? <LuEyeClosed /> : <LuEye/>}
        </button>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputField;
