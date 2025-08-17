import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "@/stores/useChatStore";
import ChatContainer from "./components/ChatContainer";
import Userlist from "./components/Userlist";

const ChatPage = () => {
  const { user } = useUser();
  const { fetchMessages, fetchUser, selectedUser } = useChatStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  useEffect(() => {
    // setSelectedUser(user?.id)
    if (selectedUser?.clerkId) {
      fetchMessages(selectedUser.clerkId);
    }
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
          <Userlist />
          {/* Chat Container */}
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
