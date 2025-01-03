import React from 'react';

const CoursesCard = ({ image, logo, university, program, duration, badge, linkText }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt="University"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt="University Logo"
            className="bg-white rounded p-1 shadow-md"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-sm text-gray-500 font-semibold mb-1">{university}</h3>
        <h2 className="text-lg font-bold text-gray-800 leading-tight">{program}</h2>
        <p className="text-sm text-gray-600 mt-2">{duration}</p>
        <div className="mt-3">
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
        <button className="mt-4 w-full text-center text-blue-600 font-semibold hover:underline">
          {linkText}
        </button>
      </div>
    </div>
  );
};

export default CoursesCard;
