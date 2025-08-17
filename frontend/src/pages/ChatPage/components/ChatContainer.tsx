import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";

const ChatContainer = () => {
  const { messages, sendMessage, selectedUser } = useChatStore();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!user?.id || !selectedUser?.clerkId) return;
    sendMessage(user.id, newMessage.trim(), selectedUser?.clerkId);
    setNewMessage("");
  };

  return (
    <div className="bg-white col-span-2 min-h-[540px] rounded-r-2xl shadow-xl overflow-hidden flex flex-col justify-between">
      {/* Chat Header */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft className="size-6 text-white" />
          </Button>

          {selectedUser ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-full flex justify-center items-center ">
                  <Avatar>
                    <AvatarImage src={selectedUser?.image} />
                  </Avatar>
                </div>
                <div className="absolute bg-green-400 size-4 -bottom-1 -right-1 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-white font-medium">
                  {selectedUser?.fullName}
                </h3>
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Phone className="size-6 text-white" />
          </Button>
          <Button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Video className="size-6 text-white" />
          </Button>
          <Button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <MoreVertical className="size-6 text-white" />
          </Button>
        </div>
      </div>

      <div className="">
        {/* Chatbox-body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message) => {
            const isSelf = message.senderId === user?.id;
            return (
              <div
                key={message._id}
                className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl shadow-md ${
                    isSelf
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {!isSelf && (
                      <Avatar className="size-6">
                        <AvatarImage src={user?.imageUrl || ""} />
                      </Avatar>
                    )}
                    <span className="text-xs text-gray-400">
                      {isSelf ? "Bạn" : "Người khác"} - 11:46
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-[10px] text-right block text-gray-300 mt-1">
                    Delivered
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center p-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
          <Button
            onClick={handleSend}
            className="ml-2 rounded-lg bg-purple-500 px-4 py-2 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
