import React from "react";

const Relax = ({ videoUrl, thumbnail, title, username, description, tags }) => {
  return (
    <div className="flex h-screen snap-start">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 flex flex-col items-center py-6 shadow-lg hidden md:flex">
      </div>

      {/* Video Content */}
      <div className="flex justify-center items-center flex-1 py-4">
        <div className="relative w-[350px] h-[600px] bg-black text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300">
          {/* Video Player */}
          <video
            src={videoUrl}
            poster={thumbnail}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />

          {/* Title Overlay */}
          <div className="absolute top-4 left-0 w-full text-center px-2">
            <h1 className="text-lg font-bold">{title}</h1>
          </div>

          {/* User Info and Actions */}
          <div className="absolute bottom-4 left-0 w-full px-4 flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-500"
                loading="lazy"
              />
              <div>
                <p className="font-semibold">@{username}</p>
                <button className="text-sm bg-red-500 px-3 py-1 rounded-full hover:bg-red-600">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Like & Tags */}
            <div className="text-right text-gray-300">
              <p className="text-xs">{description}</p>
              <p className="text-xs">{tags}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relax;