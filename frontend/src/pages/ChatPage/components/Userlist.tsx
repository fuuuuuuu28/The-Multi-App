import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // thêm tiếng Việt

// const users1 = [
//   { _id: 1, image: "123", fullName: "123" },
//   { _id: 2, image: "223", fullName: "223" },
//   { _id: 3, image: "323", fullName: "323" },
//   { _id: 4, image: "423", fullName: "423" },
//   { _id: 5, image: "523", fullName: "523" },
//   { _id: 6, image: "623", fullName: "623" },
//   { _id: 7, image: "723", fullName: "723" },
//   { _id: 8, image: "823", fullName: "823" },
//   { _id: 9, image: "923", fullName: "923" },
//   { _id: 10, image: "1023", fullName: "1023" },
//   { _id: 11, image: "1123", fullName: "1123" },
//   { _id: 12, image: "1223", fullName: "1223" },
//   { _id: 13, image: "1323", fullName: "1323" },
//   { _id: 14, image: "1423", fullName: "1423" },
//   { _id: 15, image: "1523", fullName: "1523" },
//   { _id: 16, image: "1623", fullName: "1623" },
//   { _id: 17, image: "1723", fullName: "1723" },
//   { _id: 18, image: "1823", fullName: "1823" },
// ];
const Userlist = () => {
  const { users, setSelectedUser, onlineUsers } = useChatStore();
  const { user } = useUser();
  const currentUser = user;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between p-4">
        <Avatar className="size-8">
          <AvatarImage src={currentUser?.imageUrl} />
        </Avatar>
        <p className="text-white font-bold text-lg">Message</p>
        <div className=""></div>
      </div>
      <div className="px-4 py-2 border-b border-zinc-800">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-zinc-900 text-sm rounded-md px-3 py-2 text-gray-200 focus:outline-none"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800 border-b-2 border-zinc-800`}
          >
            <div className="relative">
              <Avatar className="size-8 md:size-12">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.fullName} </AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${
                  onlineUsers.has(user._id) ? "bg-green-500" : "bg-zinc-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{user.fullName}</h3>
              <p className="text-gray-400 text-sm truncate">
                {/* {currentUser?.id === user.lastMessage?.senderId
                  ? `Bạn: ${user.lastMessage?.content}`
                  : user.lastMessage?.content } */}
                {!user.lastMessage
                  ? ""
                  : (currentUser?.id === user.lastMessage?.senderId)
                  ? `Bạn: ${user.lastMessage?.content}`
                  : user.lastMessage?.content}
              </p>
            </div>
            <span className="text-xs text-gray-500">
              {user.lastMessage?.createdAt
                ? formatDistanceToNow(new Date(user.lastMessage?.createdAt), {
                    addSuffix: true,
                    locale: vi,
                  })
                : ""}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Userlist;
