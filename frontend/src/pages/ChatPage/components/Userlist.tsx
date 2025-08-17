import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { Search } from "lucide-react";

const Userlist = () => {
  const { users, setSelectedUser } = useChatStore();
  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 space-y-4 rounded-l-2xl">
      <div className="bg-white col-span-1 shadow-md overflow-y-auto border-r">
        <div className="p-4 border-b bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
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
  );
};

export default Userlist;
