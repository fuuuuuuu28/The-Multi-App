import { axiosInstance } from "@/lib/axios";
import type { MessageType, UserType } from "@/types";
import { io } from "socket.io-client";
import { create } from "zustand";

interface ChatStore {
  isLoading: boolean;
  error: string | null;
  users: UserType[] ;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  messages: MessageType[];
  selectedUser: UserType | null;

  fetchUser: () => Promise<void>;
  initialSocket: (userId: string) => Promise<void>;
  disconnected: () => void;
  sendMessage: (senderId: string, content: string, receiverId:string) => void;
  fetchMessages:(userId:string) =>Promise<void>;
  setSelectedUser: (user:UserType | null) => void;
}
const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  isLoading: false,
  error: null,
  users: [],
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  messages: [],
  selectedUser: null,

  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/users/");
      console.log("res user: ",res.data.users)
      set({ users: res.data.users });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  initialSocket: async (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("user_conntected", (userId: string) => {
        console.log("user_conntected: ", userId);
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_online", (users: string[]) => {
        console.log("user_online: ", userId);
        set({ onlineUsers: new Set(users) });
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("message_sent",(message:MessageType) =>{
        set((state) => ({
          messages: [...state.messages, message]
        }))
      })

      socket.on("receiver_message",(message: MessageType) =>{
        set((state) =>({
          messages:[...state.messages, message]
        }))
      })

    }
  },

  disconnected: () => {
    if (get().isConnected) {
      socket.disconnect();
      console.log("disconnected", socket.disconnect());

      set({ isConnected: false });
    }
  },

  sendMessage: async(senderId, content, receiverId) =>{
    const socket = get().socket;
    if(!socket) return;

    socket.emit("send_message",{senderId, content, receiverId})
  },

  fetchMessages:async(userId) =>{
    try {
      const res =await axiosInstance.get(`/users/messages/${userId}`)
      console.log("res messages: ", res.data)
      set({ messages: res.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
  },

  setSelectedUser:(user) => {
    set({selectedUser: user})
  }
}));
