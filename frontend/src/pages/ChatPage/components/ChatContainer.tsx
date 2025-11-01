import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";

const ChatContainer = () => {
  const { messages, sendMessage, selectedUser, clearSelectedUser } =
    useChatStore();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");



  const handleSend = () => {
    if (!user?.id || !selectedUser?.clerkId) return;
    sendMessage(user.id, newMessage.trim(), selectedUser?.clerkId);
    setNewMessage("");
  };

    const handlePress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSend();
        setNewMessage('')
      }
    };

  return (
    <div className="flex flex-1 flex-col h-full ">
      {/* Header */}
      <div className="flex items-center justify-between md:px-5 py-3 px-2 border-b border-zinc-800 bg-[#0B0B0B]">
        <div className="flex items-center gap-3">
          <Button onClick={clearSelectedUser}>
            <ArrowLeft className="size-8 text-white"/>
             </Button>
          <Avatar className="size-10">
            <AvatarImage src={selectedUser?.image}/>
          </Avatar>
          <div>
            <h3 className="text-white text-lg font-semibold">{selectedUser?.fullName}</h3>
            {/* <span className="text-gray-500 text-sm">
              Last active 2 hours ago
            </span> */}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message._id}-${index}`}
              className={`flex items-start gap-3 ${
                message.senderId ? "flex-row-reverse" : ""
              }`}
            >
              {/* <Avatar className='size-8'>
												<AvatarImage
													src={
														message.senderId === user?._id
															? user.imageUrl
															: selectedUser.imageUrl
													}
												/>
											</Avatar> */}

              <div
                className={`rounded-lg p-3 max-w-[70%]
													${message.senderId ? "bg-green-500" : "bg-zinc-800"}
												`}
              >
                <p className="text-sm">{message.content}</p>
                {/* <span className='text-xs text-zinc-300 mt-1 block'>
													{(message.createdAt)}
												</span> */}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex items-center gap-3 border-t border-zinc-800 px-5 py-3 bg-[#0B0B0B]">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handlePress}
          placeholder="Aa"
          className="flex-1 bg-zinc-900 rounded-full px-4 py-2 text-gray-200 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white"
        >
          <ArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
