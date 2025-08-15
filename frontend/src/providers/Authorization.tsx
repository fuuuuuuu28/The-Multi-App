import { axiosInstance } from "@/lib/axios";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // console.log("token: ", axiosInstance.defaults.headers.common["Authorization"])
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
const Authorization = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { initialSocket, disconnected } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          if (userId) initialSocket(userId);
        }
      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in Authorication", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();

    return () => disconnected();
  }, [getToken, userId, initialSocket, disconnected]);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return <div>{children} </div>;
};

export default Authorization;
