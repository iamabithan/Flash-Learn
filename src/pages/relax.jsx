import React from 'react';
import Relax from '../components/RelaxComponent.jsx';

const RelaxSection = () => {
  const videos = [
    {
      videoUrl: "https://youtube.com/shorts/rSn9fYUGICs?si=fNcDguAcQlB1CNcY",
      thumbnail: "https://via.placeholder.com/350",
      title: "Trying to animate like the Spiderverse",
      username: "AspenAnimation",
      description: "Trying to animate like the Spiderverse...",
      tags: "#animation #funny",
    },
    {
      videoUrl: "https://www.example.com/video2.mp4",
      thumbnail: "https://via.placeholder.com/350",
      title: "Another Animation Project",
      username: "CreativeMotion",
      description: "Check out my latest animation project!",
      tags: "#creative #motion",
    },
    // Add more videos as needed
  ];

  return (
    <div className="h-screen overflow-y-scroll bg-gray-900 snap-y snap-mandatory bg-white">
      {videos.map((video, index) => (
        <Relax key={index} {...video} />
      ))}
    </div>
  );
};

export default RelaxSection;
