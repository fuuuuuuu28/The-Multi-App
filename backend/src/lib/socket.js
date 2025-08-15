import { Server } from "socket.io"
import { Message } from "../models/message.model.js";

export const initializeSocket = (server)=>{
    const io = new Server(server, {
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    const userSockets = new Map();
    // const userActivities = new Map();

    io.on("connection",(socket)=>{
        console.log('socket server connection:',socket.id)

        socket.on("user_connected",(userId) =>{
            userSockets.set(userId, socket.id)

            io.emit("user_connected", userId)

            socket.emit("user_online", Array.from(userSockets.keys()))
        })

        socket.on("send_message", async(data) =>{
            try {
                const {senderId, content, receiverId} = data;

                const message = await Message.create({
                    senderId,
                    content,
                    receiverId,
                })

                const receiverSocketId = userSockets.get(receiverId)
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receiver_message",message)
                }
                socket.emit("message_sent", message)
            } catch (error) {
                console.error("Message error: ",error)
                socket.emit("message_error", error.message)
            }
        })

        socket.on("disconnection",()=>{
            console.log('socket server disconnect',socket.id)
        })
    })
}