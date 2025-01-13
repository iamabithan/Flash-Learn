import React, { useState, useRef, useEffect } from 'react';
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
  const [playbackRate, setPlaybackRate] = useState(1);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

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

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const skipTime = (amount) => {
    const newTime = currentTime + amount;
    playerRef.current.seekTo(newTime < 0 ? 0 : newTime > duration ? duration : newTime);
  };

  return (
    <div
      ref={containerRef}
      className={`relative sm:h-[66vh] bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
      style={style}
    >
      {!isPlaying && thumbnailUrl && (
        <div className='absolute inset-0 flex items-center justify-center bg-black cursor-pointer' onClick={togglePlay}>
          <img src={thumbnailUrl} alt='Video Thumbnail' className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <button className='p-4 bg-blue-500 text-white rounded-full'>
              <FaPlay size={24} />
            </button>
          </div>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls={false}
        width='100%'
        height='100%'
        volume={isMuted ? 0 : volume}
        playbackRate={playbackRate}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              controls: 0,
              fs: 0,
            },
          },
        }}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPlay={() => setIsPlaying(true)} // Sync state when playing
        onPause={() => setIsPlaying(false)} // Sync state when paused
      />

      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent'>
        {/* Progress Bar */}
        <input
          type='range'
          value={progress}
          onChange={handleSeek}
          className='w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer'
        />
        <div className='flex justify-between items-center text-white mt-2'>
          <span className='text-sm'>{formatTime(currentTime)}</span>
          {/* Skip Backward */}
          <button
            onClick={() => skipTime(-10)}
            className='p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full'
          >
            <FaBackward size={16} />
          </button>
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full'
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
          {/* Skip Forward */}
          <button
            onClick={() => skipTime(10)}
            className='p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full'
          >
            <FaForward size={16} />
          </button>
          <span className='text-sm'>{formatTime(duration)}</span>
          {/* Volume Control */}
          <div className='flex items-center space-x-2'>
            <button onClick={toggleMute} className='p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full'>
              {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            </button>
            <input
              type='range'
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className='w-16 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer'
            />
          </div>
          {/* Fullscreen */}
          <button
            onClick={handleFullScreen}
            className='p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full'
          >
            {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
