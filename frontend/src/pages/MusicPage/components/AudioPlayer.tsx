import { Button } from "@/components/ui/button";
import { useSongStore } from "@/stores/useSongStore";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface AudioPlayerProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    formatTime: (seconds: number) => string;
}
const AudioPlayer = ({ audioRef, formatTime} : AudioPlayerProps) => {
  const { songs, currentSong, setCurrentSong, isPlaying, setIsPlaying } =
    useSongStore();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isShuffle] = useState(false);
  const [repeat, setRepeat] = useState("repeat");

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSong]);

  const handleUpdateTime = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = Number(e.target.value);
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
      setProgress(value);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      handleRandom();
    }
    const currentIndex = songs.findIndex((s) => s._id === currentSong?._id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const currentIndex = songs.findIndex((s) => s._id === currentSong?._id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = Number(e.target.value);
      audioRef.current.volume = value / 100;
      setVolume(value);
    }
  };

  const mutedVolume = () => {
    if (volume === 0) {
      setVolume(100);
    } else {
      setVolume(0);
    }
  };

  const handleRepeat = () => {
    setRepeat((value) => {
      switch (value) {
        case "repeat":
          return "repeat_one";
        case "repeat_one":
          return "shuffle";
        default:
          return "repeat";
      }
    });
  };

  const endedAudio = () => {
    switch (repeat) {
      case "repeat_one":
        return audioRef.current?.play();
      case "shuffle":
        return handleRandom();
      default:
        return handleNext();
    }
  };

  const handleRandom = () => {
    const currentIndex = songs.findIndex((s) => s._id === currentSong?._id);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentIndex);
    setCurrentSong(songs[randomIndex]);
  };

  return (
    <div className="py-5 space-y-3">
      {/* progress */}
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl}
        onTimeUpdate={handleUpdateTime}
        onEnded={endedAudio}
      />
      <div className="w-full flex items-center gap-4">
        <span className="text-xs sm:text-sm text-white/80 min-w-[35px] sm:min-w-[40px]">
          {formatTime(Number(audioRef.current?.currentTime || 0))}
        </span>
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="flex-1 accent-pink-500 "
        />
          <span className="text-xs sm:text-sm text-white/80 min-w-[35px] sm:min-w-[40px] text-right">
            {formatTime(Number(audioRef.current?.duration || 0))}
          </span>
      </div>

      {/* Player Audio */}
 <div className="flex flex-col items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
        {/* Main Controls */}
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <Button
            onClick={handleRepeat}
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white border-none"
            size="sm"
          >
            {repeat === "repeat" ? (
              <Repeat className="size-4 sm:size-5" />
            ) : repeat === "repeat_one" ? (
              <Repeat1 className="size-4 sm:size-5" />
            ) : (
              <Shuffle className="size-4 sm:size-5" />
            )}
          </Button>
          
          <Button
            onClick={handlePrev}
            className="p-2 sm:p-4 rounded-full bg-white/80 shadow-lg hover:bg-white text-black"
          >
            <SkipBack className="size-4 sm:size-5" />
          </Button>
          
          <Button
            onClick={handlePlay}
            className="p-4 sm:p-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-xl hover:scale-105 duration-150"
          >
            {isPlaying ? (
              <Pause className="size-6 sm:size-8" />
            ) : (
              <Play className="size-6 sm:size-8 ml-1" />
            )}
          </Button>
          
          <Button
            onClick={handleNext}
            className="p-2 sm:p-4 rounded-full bg-white/80 shadow-lg hover:bg-white text-black"
          >
            <SkipForward className="size-4 sm:size-5" />
          </Button>
          
          <Button
            onClick={mutedVolume}
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white border-none"
            size="sm"
          >
            {volume === 0 ? (
              <VolumeOff className="size-4 sm:size-5" />
            ) : (
              <Volume2 className="size-4 sm:size-5" />
            )}
          </Button>
        </div>
        
        {/* Volume Control - Hidden on very small screens */}
        <div className="hidden md:flex items-center gap-2 md:gap-3 w-full max-w-32 md:max-w-40">
          <VolumeOff className="size-3 sm:size-4 text-white/60" />
          <input
            type="range"
            value={volume}
            onChange={handleVolume}
            className="flex-1 accent-purple-500 h-1 sm:h-2 rounded-full"
          />
          <Volume2 className="size-3 sm:size-4 text-white/60" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
