import { axiosInstance } from "@/lib/axios";
import type { SongType } from "@/types";
import { create } from "zustand";

interface SongStore {
  isLoading: boolean;
  error: string | null;
  songs: SongType[];
  currentIndex: number;
  currentSong: SongType | null;
  isPlaying: boolean;

  fetchSongs: () => Promise<void>;
  setCurrentSong: (song: SongType) => void;
  setIsPlaying:(value:boolean) =>void;
}
export const useSongStore = create<SongStore>((set) => ({
  isLoading: false,
  error: null,
  songs: [],
  currentIndex: -1,
  currentSong: null,
  isPlaying:false,

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs");
      set({ songs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentSong: (song) => {
    set({currentSong: song});
  },

  setIsPlaying:(value) => set({isPlaying:value})
}));
