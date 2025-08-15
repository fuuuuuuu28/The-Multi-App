import {
  ArrowLeft,
  MessageCircleMore,
  MoreVertical,
  Phone,
  Search,
  User,
  Video,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "@/stores/useChatStore";
import { Avatar, AvatarImage } from "../ui/avatar";

const ChatPage = () => {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");

  const {
    messages,
    sendMessage,
    fetchMessages,
    fetchUser,
    users,
    selectedUser,
    setSelectedUser,
  } = useChatStore();

  const handleSend = () => {
    if (!user?.id || !selectedUser?.clerkId) return;
    sendMessage(user.id, newMessage.trim(), selectedUser?.clerkId);
    setNewMessage("");
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  useEffect(() => {
    // setSelectedUser(user?.id)
    fetchMessages(selectedUser?.clerkId);
  }, [fetchMessages, selectedUser]);
  return (
    <div className=" rounded-2xl gap-3 py-3">
      <div className="mx-auto px-5 max-w-6xl">
        {/* Header */}
        {/* <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 text-3xl font-bold bg-blue-500 text-transparent bg-clip-text mb-2">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <MessageCircleMore className="size-5 text-white" />
            </div>
            <h1 className="">CHAT WITH FRIENDS</h1>
          </div>
          <p className="text-gray-500">Trò chuyện với những người bạn</p>
        </div> */}

        <div className="grid grid-cols-3">
          {/* User List */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 space-y-4 rounded-l-2xl">
            <div className="bg-white col-span-1 shadow-md overflow-y-auto border-r">
              <div className="p-4 border-b bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="border-b">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="py-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.image} />
                      </Avatar>
                      <span>{user.fullName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Container */}
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
                      className={`flex ${
                        isSelf ? "justify-end" : "justify-start"
                      }`}
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
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
