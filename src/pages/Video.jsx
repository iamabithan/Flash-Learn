import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomVideoPlayer from '../components/VideoPlayer'; // Reuse your custom player
import { FaArrowLeft } from 'react-icons/fa';

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state || {};

  // Redirect if no video data is passed
  if (!video) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex">


      {/* Main Content */}
      <div className="p-2 flex mt-5 md:mt-0 flex-col items-center w-full h-full">
        <div className="w-full  max-w-4xl bg-white rounded-lg shadow-lg p-0 md:p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 ml-9 text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          {/* Video Player */}
          <CustomVideoPlayer videoUrl={video.url} thumbnailUrl={video.thumbnail} />

          {/* Video Details */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-800">{video.title}</h1>
            <p className="text-lg text-gray-600 mt-2">
              <span className="font-semibold">Topic:</span> {video.topic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
