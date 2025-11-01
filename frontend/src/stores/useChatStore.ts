import { axiosInstance } from "@/lib/axios";
import type { MessageType, UserType } from "@/types";
import { io } from "socket.io-client";
import { create } from "zustand";

interface ChatStore {
  isLoading: boolean;
  error: string | null;
  users: UserType[];
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  messages: MessageType[];
  selectedUser: UserType | null;
  isMobileView: boolean;

  fetchUser: () => Promise<void>;
  initialSocket: (userId: string) => Promise<void>;
  disconnected: () => void;
  sendMessage: (senderId: string, content: string, receiverId: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: UserType | null) => void;
  clearSelectedUser: () => void;
}

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;
const socket = io(baseURL, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true,
});

function moveToTop(users: UserType[], userId: string) {
  const idx = users.findIndex((user) => user.clerkId === userId);
  if (idx === -1) return users;

  const newUser = [users[idx], ...users.filter((_, i) => i !== idx)];
  return newUser;
}
export const useChatStore = create<ChatStore>((set, get) => ({
  isLoading: false,
  error: null,
  users: [],
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  messages: [],
  selectedUser: null,
  isMobileView: false,

  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/users/");
      // console.log("res user: ", res.data.users);
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

      socket.on("message_sent", (message: MessageType) => {
        set((state) => ({
          messages: [...state.messages, message],
          users: moveToTop(state.users, message.receiverId),
        }))
      });

      socket.on("last_message_updated", ({ senderId, receiverId, message }) => {
        set((state) => {
          const updatedUser = state.users.map((user) => {
            if (user.clerkId === senderId || user.clerkId === receiverId) {
              return { ...user, lastMessage: message };
            }
            return user;
          });
          return { users: updatedUser };
        });
      });

      socket.on("receiver_message", (message: MessageType) => {
        set((state) => ({
          messages:[...state.messages, message],
          users: moveToTop(state.users, message.senderId)
        }));
      });
    }
  },

  disconnected: () => {
    if (get().isConnected) {
      socket.disconnect();
      console.log("disconnection", socket.disconnect());

      set({ isConnected: false });
    }
  },

  sendMessage: async (senderId, content, receiverId) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("send_message", { senderId, content, receiverId });
  },

  fetchMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/users/messages/${userId}`);
      // console.log("res messages: ", res.data);
      set({ messages: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedUser: (user) =>
    set(() => ({
      selectedUser: user,
      // Nếu chọn user thì chuyển sang ChatContainer
      isMobileView: !!user,
    })),

  clearSelectedUser: () =>
    set(() => ({
      selectedUser: null,
      isMobileView: false,
    })),
}));
