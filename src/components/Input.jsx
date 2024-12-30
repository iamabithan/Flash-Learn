import React from 'react';

const InputField = ({ type = "text", name, placeholder, value, onChange, onBlur, error }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
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
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputField;
