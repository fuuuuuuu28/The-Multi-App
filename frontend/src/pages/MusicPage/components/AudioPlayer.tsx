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
        <span className="text-sm">
          {formatTime(Number(audioRef.current?.currentTime || 0))}
        </span>
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="flex-1 accent-pink-500"
        />
        <div className="">
          <span className="text-sm">
            {formatTime(Number(audioRef.current?.duration || 0))}
          </span>
        </div>
      </div>

      {/* Player Audio */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          onClick={handleRepeat}
          className="p-3 rounded-full bg-white shadow hover:bg-gray-100"
        >
          {repeat === "repeat" ? (
            <Repeat />
          ) : repeat === "repeat_one" ? (
            <Repeat1 />
          ) : (
            <Shuffle />
          )}
        </Button>
        <Button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white/80 shadow-lg hover:bg-white"
        >
          <SkipBack />
        </Button>
        <Button
          onClick={handlePlay}
          className="p-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-xl hover:scale-105 duration-150"
        >
          {isPlaying ? (
            <Pause className="size-8" />
          ) : (
            <Play className="size-8" />
          )}
        </Button>
        <Button
          onClick={handleNext}
          className="p-4 rounded-full bg-white/80 shadow-lg hover:bg-white"
        >
          <SkipForward />
        </Button>
        <Button
          onClick={mutedVolume}
          className="p-3 rounded-full bg-white shadow hover:bg-gray-100"
        >
          {volume === 0 ? <VolumeOff /> : <Volume2 />}
        </Button>
        <input
          type="range"
          value={volume}
          onChange={handleVolume}
          className="accent-purple-500"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
