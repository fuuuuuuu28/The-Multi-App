import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { Search } from "lucide-react";

const Userlist = () => {
  const { users, setSelectedUser } = useChatStore();
  return (
    <div className=" sm:shadow-md rounded-2xl bg-white min-w-[350px] h-[700px] md:h-[550px] overflow-y-auto">
      <div className="p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
          >

              <Avatar>
                <AvatarImage src={user?.image} />
              </Avatar>
              <span>{user.fullName}</span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
