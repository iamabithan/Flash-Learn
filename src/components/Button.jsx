import React from 'react';

const Button = ({ type = "button", onClick, children, variant = "primary" }) => {
  const baseStyles =
    "w-full py-2 px-4 rounded-lg text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
    secondary: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400",
    danger: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
