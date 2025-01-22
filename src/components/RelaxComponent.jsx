import React, { useEffect, useRef, useState } from "react";

const Relax = ({ videoUrl, thumbnail, title, username, description, tags }) => {
  const [isActive, setIsActive] = useState(false); // Track whether the video is active (in view)
  const iframeRef = useRef(null); // Reference to the iframe element

  // Extract the video ID for YouTube Shorts
  const videoId = videoUrl.includes("youtube.com/shorts/")
    ? videoUrl.split("shorts/")[1] // Extract the video ID after 'shorts/'
    : videoUrl.split("v=")[1]?.split("&")[0]; // Extract the video ID for regular YouTube videos

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=${isActive ? 1 : 0}` // Only autoplay when active
    : videoUrl; // If it's not a Shorts URL, use the original video URL

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the iframe is in view
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsActive(true); // Video is in view, start autoplay
        } else {
          setIsActive(false); // Video is out of view, stop autoplay
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    // Start observing the iframe when the component mounts
    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-screen snap-start">

      {/* Video Content */}
      <div className="flex justify-center items-center flex-1 py-4">
        <div className="relative w-[350px] h-[600px] bg-black text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300">
          {/* YouTube Embed (using iframe) */}
          <iframe
            ref={iframeRef} // Set the iframe reference
            width="100%"
            height="100%"
            src={embedUrl} // Use the correct embed URL with autoplay
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-0 w-full px-4 flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-2">
              {/* <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-500"
                loading="lazy"
              /> */}
              {/* <div>
                <p className="font-semibold">@{username}</p>
                <button className="text-sm bg-red-500 px-3 py-1 rounded-full hover:bg-red-600">
                  Subscribe
                </button>
              </div> */}
            </div>

            {/* Like & Tags */}
            {/* <div className="text-right text-gray-300">
              <p className="text-xs">{description}</p>
              <p className="text-xs">{tags}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relax;
