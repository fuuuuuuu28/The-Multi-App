import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "@/stores/useChatStore";
import ChatContainer from "./components/ChatContainer";
import Userlist from "./components/Userlist";

const ChatPage = () => {
  const { user } = useUser();
  const { fetchMessages, fetchUser, selectedUser } =
    useChatStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  useEffect(() => {
    // setSelectedUser(user?.id)
    if (selectedUser?.clerkId) {
      fetchMessages(selectedUser.clerkId);
      console.log("first");
    }
  }, [fetchMessages, selectedUser]);
  return (
    <div className="flex w-full min-h-[650px]">
      <div
        className={`${
          selectedUser ? "hidden md:flex" : "flex"
        } w-full md:w-[320px] bg-[#0B0B0B] border-r border-zinc-800`}
      >
        <Userlist />
      </div>

      
       <div
        className={`${
          selectedUser ? "flex" : "hidden md:flex"
        } flex-1 bg-[#090909]`}
      >
        <ChatContainer />
      </div>
      
    </div>
  );
};

export default ChatPage;
