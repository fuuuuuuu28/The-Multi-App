import { Disc3, ListMusic, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSongStore } from "@/stores/useSongStore";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import AddSongs from "./components/AddSongs";
import Playlist from "./components/Playlist";
import { Button } from "@/components/ui/button";

const MusicPage = () => {
  const { fetchSongs, currentSong, isPlaying } = useSongStore();
  const [showPlaylist, setShowPlaylist] = useState(false);

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
    <div className=" rounded-2xl gap-3 py-3 ">
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

        <div className="grid grid-cols-1 md:grid-cols-3  ">
          {/* Playing Song */}
          {/* Header Song */}
          <div className="text-center col-span-2 bg-white/30 backdrop-blur shadow-lg rounded-l-2xl border-r space-y-5">
            <div className="flex items-center justify-center gap-3 pt-4">
              <h1 className="text-2xl">Now Playing</h1>
              <Disc3 className="size-10" />
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 ">
              <img
                src={currentSong?.imageUrl || ""}
                className={`w-48 h-48 rounded-full border-4 border-gradient-to-br from-pink-400 to-purple-500 shadow-xl spin-slow ${
                  isPlaying ? "" : "paused"
                }`}
              />
              <div>
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

            <Button
              onClick={() => setShowPlaylist(true)}
              className="lg:hidden mt-4 flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-600"
            >
              <ListMusic className="size-5" />
              Xem Playlist
            </Button>
          </div>

          <div className="hidden md:block col-span-1 w-64 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg overflow-y-auto space-y-4">
            {/* Add Songs */}
            <AddSongs />
            {/* PlayList */}
            <Playlist audioRef={audioRef} formatTime={formatTime} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 h-[70%] bg-white/40 backdrop-blur-md rounded-t-2xl shadow-2xl p-4 z-50"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="font-semibold text-lg">Playlist</h2>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>
            <AddSongs />
            <div className="overflow-y-auto h-[calc(100%-80px)]">
              <Playlist audioRef={audioRef} formatTime={formatTime} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPage;
