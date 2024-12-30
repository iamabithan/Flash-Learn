import React, { useState } from "react";

const InputDropdown = ({ options, onSelect, placeholder, className, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Delay to allow click
        className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 
            transition-colors duration-300 ease-in-out ${
              error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
        placeholder={placeholder || "Type to search..."}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-40 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 hover:bg-blue-100 text-gray-700 cursor-pointer transition-colors rounded-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
