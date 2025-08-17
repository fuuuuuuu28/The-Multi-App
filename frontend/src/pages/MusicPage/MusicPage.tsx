import { Disc3 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSongStore } from "@/stores/useSongStore";
import AudioPlayer from "./components/AudioPlayer";
import AddSongs from "./components/AddSongs";
import Playlist from "./components/Playlist";

const MusicPage = () => {
  const { fetchSongs, currentSong, isPlaying } =
    useSongStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} : ${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className=" rounded-2xl gap-3 py-3">
      <div className="mx-auto px-5 max-w-6xl">
        {/* HEADER */}
        {/* <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 text-4xl font-bold text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text mb-4">
            <div className="bg-blue-500 p-3 rounded-2xl shadow-lg">
              <Music className="text-white size-10" />
            </div>
            <h1>RELAX & CHILL</h1>
          </div>
          <div className="text-gray-500">Thư giãn sau những giờ làm việc</div>
        </div> */}

        <div className="grid grid-cols-3 ">
          {/* Playing Song */}
          {/* Header Song */}
          <div className="text-center col-span-2 bg-white/30 min-w-[600px] backdrop-blur shadow-lg rounded-l-2xl border-r space-y-5">
            <div className="flex items-center justify-center gap-3 pt-4">
              <h1 className="text-2xl">Now Playing</h1>
              <Disc3 className="size-10" />
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 ">
              <img
                src={currentSong?.imageUrl || ""}
                className={`w-72 h-72 rounded-full border-4 border-gradient-to-br from-pink-400 to-purple-500 shadow-xl spin-slow ${
                  isPlaying ? "" : "paused"
                }`}
              />
              <div className="">
                <p className="text-3xl font-medium mt-4">
                  {currentSong?.title || "Choose your music"}{" "}
                </p>
                <p className="text-lg text-gray-700">
                  {currentSong?.artist || "Unknown Artist"}{" "}
                </p>
              </div>
            </div>

            {/* Audio Song */}
            <AudioPlayer audioRef={audioRef} formatTime={formatTime} />
          </div>

          <div className="col-span-1 w-64 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg overflow-y-auto space-y-4">
            {/* Add Songs */}
            <AddSongs />
            {/* PlayList */}
            <Playlist audioRef={audioRef} formatTime={formatTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
