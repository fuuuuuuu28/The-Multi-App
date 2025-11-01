import { Server } from "socket.io";
import { Message } from "../models/message.model.js";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config();

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, "http://localhost:5173"],
      credentials: true,
    },
  });

  const userSockets = new Map();

  io.on("connection", (socket) => {
    console.log("socket server connection:", socket.id);

    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);

      io.emit("user_connected", userId);

      socket.emit("user_online", Array.from(userSockets.keys()));
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, content, receiverId } = data;

        const message = await Message.create({
          senderId,
          content,
          receiverId,
        });

        await Promise.all([
          User.findOneAndUpdate(
            { clerkId: senderId },
            { lastMessage: message._id, lastMessageAt: message.createdAt },
            { new: true }
          ),
          User.findOneAndUpdate(
            { clerkId: receiverId },
            { lastMessage: message._id, lastMessageAt: message.createdAt },
            { new: true }
          ),
        ]);

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiver_message", message);
        }
        socket.emit("message_sent", message);

        io.emit("last_message_updated", { senderId, receiverId, message });
      } catch (error) {
        console.error("Message error: ", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnection", () => {
      console.log("socket server disconnect", socket.id);
    });
  });
};
