import {
  Disc3,
  Pause,
  Play,
  Plus,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Upload,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { axiosInstance } from "@/lib/axios";
import { useSongStore } from "@/stores/useSongStore";

interface NewSong {
  title: string;
  artist: string;
}

interface Files {
  audio: File | null;
  image: File | null;
}
const MusicPage = () => {
  const {
    fetchSongs,
    songs,
    setCurrentSong,
    currentSong,
    isPlaying,
    setIsPlaying,
  } = useSongStore();

  const [newSong, setNewSong] = useState<NewSong>({ title: "", artist: "" });
  const [files, setFiles] = useState<Files>({ audio: null, image: null });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isShuffle] = useState(false);
  const [repeat, setRepeat] = useState("repeat");

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} : ${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSong]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!files.audio || !files.image) {
        alert("Please upload all files");
      }
      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      if (files.audio && files.image) {
        formData.append("audioFile", files.audio);
        formData.append("imageFile", files.image);
      }

      await axiosInstance.post("/songs/createSong", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("form: ", formData);

      setNewSong({ title: "", artist: "" });
      setFiles({ audio: null, image: null });
      alert("Song added successfully");
    } catch (error) {
      throw new Error("Failed to add song: " + error);
    } finally {
      setIsLoading(false);
    }
  };

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
          </div>

          <div className="col-span-1 w-64 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg overflow-y-auto space-y-4">
            {/* Add Songs */}
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"} className="cursor-pointer">
                  <Plus />
                  <h1>Add Song</h1>
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[90%] w-[500px] bg-white/90 ">
                <DialogHeader>
                  <DialogTitle> Add New Song</DialogTitle>
                  <DialogDescription>
                    Thêm bài hát mới vào thư viện
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                  <input
                    type="file"
                    accept="audio/*"
                    ref={audioInputRef}
                    hidden
                    onChange={(e) =>
                      setFiles((prev) => ({
                        ...prev,
                        audio: e.target.files![0],
                      }))
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    hidden
                    onChange={(e) =>
                      setFiles((prev) => ({
                        ...prev,
                        image: e.target.files![0],
                      }))
                    }
                  />

                  <div
                    className="h-[150px] flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center p-12 space-y-5">
                      {files.image ? (
                        <>
                          <div className="text-center">
                            <h1 className="font-semibold">Image selected:</h1>
                            <p className="">{files.image.name.slice(0, 20)} </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-500 rounded-full p-3">
                            <Upload className="size-7 " />
                          </div>
                          <h1>Upload artwork</h1>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className="hover:bg-gray-600 duration-100"
                    onClick={() => audioInputRef.current?.click()}
                  >
                    <Button
                      variant={"outline"}
                      className="w-full cursor-pointer"
                    >
                      {files.audio
                        ? files.audio.name.slice(0, 20)
                        : "Choose Audio File"}
                    </Button>
                  </div>

                  <div className="">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      placeholder="Title..."
                      value={newSong.title}
                      onChange={(e) =>
                        setNewSong({ ...newSong, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="">
                    <label className="text-sm font-medium">Artist</label>
                    <Input
                      placeholder="Artist..."
                      value={newSong.artist}
                      onChange={(e) =>
                        setNewSong({ ...newSong, artist: e.target.value })
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    className="bg-gradient-to-tr from-green-500 to-teal-500 text-white cursor-pointer"
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* PlayList */}
            <div className="mt-2 overflow-y-hidden">
              {songs.map((song) => (
                <div
                  key={song._id}
                  onClick={() => setCurrentSong(song)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:scale-[1.02] hover:bg-white/60 transition-all mb-2 ${
                    currentSong?._id === song._id ? "bg-white shadow-inner" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="">
                      <img
                        src={song.imageUrl}
                        alt="image"
                        className="size-15 rounded-2xl object-cover shadow"
                      />
                    </div>
                    <div className="max-w-[80px]">
                      <p className="text-3xl font-medium truncate">
                        {/* {song.title.length > 10
                          ? song.title.slice(0, 9) + "…"
                          : song.title} */}
                        {song.title}
                      </p>
                      <h1 className="text-xl text-gray-700 truncate">
                        {song.artist}
                      </h1>
                    </div>
                  </div>
                  {isPlaying && currentSong?._id === song._id ? (
                    <div className="flex gap-1">
                      <div className="w-1 bg-purple-500 rounded-full animate-bounce h-[20px]" />
                      <div className="w-1 bg-purple-500 rounded-full animate-bounce h-[30px]" />
                      <div className="w-1 bg-purple-500 rounded-full animate-bounce h-[20px]" />
                    </div>
                  ) : (
                    <div>{formatTime(Number(audioRef.current?.duration))}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
