import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomVideoPlayer from '../components/VideoPlayer'; // Reuse your custom player

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state || {};

  if (!video) {
    // Redirect back to the dashboard if no video data is passed
    navigate('/');
    return null;
  }

  console.log({video})

  return (
    <div className="p-6 w-full h-full">
      <CustomVideoPlayer videoUrl={video.url} thumbnailUrl={video.thumbnail} />
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-lg mt-2">Topic: {video.topic}</p>
    </div>
  );
};

export default Content;
