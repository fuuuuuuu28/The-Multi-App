import { useSongStore } from "@/stores/useSongStore";

interface PlaylistProps{
    audioRef: React.RefObject<HTMLAudioElement | null>;
    formatTime: (seconds: number) => string;
}
const Playlist = ({audioRef, formatTime} : PlaylistProps) => {
  const { songs, setCurrentSong, currentSong, isPlaying } = useSongStore();
  return (
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
              <h1 className="text-xl text-gray-700 truncate">{song.artist}</h1>
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
  );
};

export default Playlist;
