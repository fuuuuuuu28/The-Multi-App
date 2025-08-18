import { useEffect, useState } from "react";
import {
  CheckSquare,
  Menu,
  MessageCircleMore,
  Music,
  XIcon,
} from "lucide-react";
import TodoPage from "@/pages/TodoPage/TodoPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import MusicPage from "@/pages/MusicPage/MusicPage";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import SignInOAuth from "@/providers/SignInOAuth";
import { Link } from "react-router-dom";

const Layout = () => {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem("activeTab") || "chat");
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(()=>{
    sessionStorage.setItem("activeTab", activeTab)
  }, [activeTab])

  const tabs = [
    {
      id: "todo",
      label: "Todo",
      icon: CheckSquare,
      color: "emerald",
      gradient: "from-emerald-400 to-emerald-600",
      title: "Quản lý công việc của bạn một cách hiệu quả",
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircleMore,
      color: "blue",
      gradient: "from-blue-400 to-blue-600",
      title: "CHAT WITH FRIENDS",
    },
    {
      id: "music",
      label: "Music",
      icon: Music,
      color: "purple",
      gradient: "from-purple-400 to-purple-600",
      title: "RELAX & CHILL",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "todo":
        return <TodoPage />;
      case "chat":
        return <ChatPage />;
      case "music":
        return <MusicPage />;
      default:
        return <ChatPage />;
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex">
      <Button
        className="fixed top-4 left-4 z-40 bg-white rounded-lg p-2 shadow-lg"
        onClick={() => setSideBarOpen(!sideBarOpen)}
      >
        <Menu />
      </Button>

      <div
        className={`w-64 fixed inset-y-0 z-50 left-0 bg-white/10 backdrop-blur-lg border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-xl bg-gradient-to-r ${currentTab?.gradient} flex items-center justify-center shadow-lg`}
            >
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">My App</h1>
              <span className="text-sm text-white/70">Dashboard</span>
            </div>
            <XIcon
              className="absolute right-5 size-8 p-2 bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Link
                to={`/${tab.id}`}
                key={tab.id}
                className={`w-full flex items-center gap-3 px-3 py-4 rounded-xl font-medium transition-all duration-300 group ${
                  isActive
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105`
                    : `text-white/80 hover:bg-white/10 hover:text-white`
                } `}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSideBarOpen(false);
                }}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? "bg-white/20"
                      : "bg-white/10 group-hover:bg-white/20"
                  } transition-colors duration-200`}
                >
                  <Icon className="size-5" />
                </div>
                <span className="font-semibold">{tab.label}</span>
                {isActive && (
                  <div className="ml-auto size-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white/10 backdrop-blur-2xl rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className=" bg-gray-400 rounded-full flex items-center justify-center">
                <SignedOut>
                  <SignInOAuth />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user?.fullName}{" "}
                </p>
                <p className="text-white/70 text-xs">
                  {user?.emailAddresses[0].emailAddress}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className={`bg-${currentTab?.color}-500 p-3 rounded-2xl shadow-lg`}>
              {currentTab && <currentTab.icon className="text-white size-10" />}
            </div>
            <div className="text-center">
              <h2 className={`text-2xl font-bold text-${currentTab?.color}-500 `}>
                {currentTab?.label}
              </h2>
              <p className="text-white/70">{currentTab?.title}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="h-full transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
