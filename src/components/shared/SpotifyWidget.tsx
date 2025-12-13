"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Plus, MoreHorizontal, Shuffle, Repeat } from "lucide-react";

const TRACKS = [
  {
    title: "Berubah",
    artist: "Tenxi, Jemsii",
    explicit: false,
    image: "https://i.scdn.co/image/ab67616d0000b273ebdd8446bacd87dc7796cede",
    audioUrl: "/music/berubah.mp3",
    duration: "3:21"
  },
  {
    title: "Bintang 5",
    artist: "Tenxi, Jemsii",
    explicit: false,
    image: "https://i.scdn.co/image/ab67616d0000b273ebdd8446bacd87dc7796cede",
    audioUrl: "/music/bintang5.mp3",
    duration: "4:06"
  },
  {
    title: "SO ASU",
    artist: "NayKilla",
    explicit: true,
    image: "https://i.scdn.co/image/ab67616d0000b273bc3ac83da4a6bda98247e694",
    audioUrl: "/music/soasu.mp3",
    duration: "2:36"
  }
];

const SpotifyWidget = ({ onPlayStateChange }: { onPlayStateChange?: (isPlaying: boolean) => void }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Update parent component when play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Handle Play/Pause Side Effects
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Helper function to format seconds into "MM:SS"
  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, isDragging]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const playPrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? TRACKS.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-md bg-[#181818] rounded-[32px] p-6 shadow-2xl border border-zinc-800/50"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* --- Top Section: Album & Tracks --- */}
      <div className="flex gap-6 mb-6">
        {/* Album Art Container with Vinyl */}
        <div className="relative w-24 h-24 flex-shrink-0">
          {/* 1. THE VINYL (Behind) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
            className={`absolute top-0 left-0 w-full h-full rounded-full bg-black flex items-center justify-center transition-all duration-500 -z-10 ${isPlaying ? "translate-x-12" : "translate-x-0"}`}
          >
            <div className="w-1/3 h-1/3 bg-[#181818] rounded-full border border-zinc-800" />
          </motion.div>

          {/* 2. THE ALBUM ART (Front) */}
          <div className="relative z-10 w-full h-full rounded-md shadow-lg">
            <img 
              src={currentTrack.image} 
              alt="Album"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Track List */}
        <div className="flex flex-col gap-3 w-full">
          {/* Header / Spotify Icon */}
          <div className="flex justify-end">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1DB954]">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>

          {/* Tracks */}
          <div className="space-y-2 text-sm">
            {TRACKS.map((track, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 ${index === currentTrackIndex ? 'text-white font-medium' : 'text-zinc-400'} cursor-pointer hover:text-white transition-colors`}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
              >
                <span className={index === currentTrackIndex ? 'text-green-500 w-4' : 'w-4'}>
                  {index + 1}
                </span>
                <div className="flex flex-col leading-tight">
                  <span>{track.title}</span>
                  <span className="text-[10px] text-zinc-400 font-normal">{track.artist}</span>
                </div>
                {track.explicit && (
                  <span className="bg-zinc-600 text-[8px] px-1 rounded text-zinc-200">E</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Player Controls --- */}
      <div>
        <p className="text-[10px] font-medium text-zinc-400 mb-2 tracking-wide">
          {currentTrack.title} • {currentTrack.artist}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:h-1.5 transition-all"
            style={{
              backgroundSize: `${duration > 0 ? (currentTime / duration) * 100 : 0}% 100%`,
              background: `linear-gradient(to right, #10b981 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #525252 ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`
            }}
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-zinc-400">
            <Shuffle className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
            <SkipBack 
              className="w-5 h-5 hover:text-white transition-colors cursor-pointer" 
              onClick={playPrevious}
            />
          </div>

          <div 
            className="bg-white rounded-full p-3 hover:scale-105 transition-transform cursor-pointer"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black fill-current" />
            ) : (
              <Play className="w-6 h-6 text-black fill-current translate-x-0.5" />
            )}
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <SkipForward 
              className="w-5 h-5 hover:text-white transition-colors cursor-pointer" 
              onClick={playNext}
            />
            <Plus className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
};

export default SpotifyWidget;