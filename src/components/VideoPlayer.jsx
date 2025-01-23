import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
} from 'react-icons/fa';

const CustomVideoPlayer = ({ videoUrl, thumbnailUrl, className = '', style = {} }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const handleProgress = (state) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration) => setDuration(duration);

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * duration;
    playerRef.current.seekTo(seekTo);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (isFullscreen) {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      } else {
        containerRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const skipTime = (amount) => {
    const newTime = currentTime + amount;
    playerRef.current.seekTo(Math.max(0, Math.min(duration, newTime)));
  };

  return (
    <div
      ref={containerRef}
      className={`relative sm:h-[66vh] bg-black h-60 rounded-lg overflow-hidden shadow-md ${className}`}
      style={style}
    >
      {!isPlaying && thumbnailUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer"
          onClick={togglePlay}
        >
          <img src={thumbnailUrl} alt="Video Thumbnail" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <FaPlay size={32} />
            </button>
          </div>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        volume={isMuted ? 0 : volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          },
        }}
      />
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
        {/* Progress Bar */}
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between items-center mt-3">
           {/* Time and Volume Controls */}
           <div className="flex items-center space-x-4">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          {/* Play/Pause and Skip Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => skipTime(-10)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <FaBackward size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-blue-700 rounded-full"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button
              onClick={() => skipTime(10)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <FaForward size={20} />
            </button>
          </div>
          <div>
            <button onClick={toggleMute} className="p-2 hover:bg-gray-700 rounded-full">
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            {/* Fullscreen Button */}
          <button
            onClick={handleFullScreen}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
          </div>
         

          
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
