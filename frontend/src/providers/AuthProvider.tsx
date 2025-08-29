import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useAuth, useClerk, useSignIn, useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = () => {
  const { isLoaded, user } = useUser();
  const auth = useAuth();
  const sigin = useSignIn();
  const clerk = useClerk();
  const navigate = useNavigate();
  console.log("user: ", user);
  console.log("auth: ",auth)
  console.log("sigin: ",sigin)
  console.log("clerk: ",clerk)

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;
      try {
        await axiosInstance.post("/users/clerkProvider", {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback client", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-white to-purple-500">
      <Card className="w-[50%] min-h-[300px] mx-auto text-center bg-white">
        <CardContent className="flex flex-col items-center justify-between">
          <div className="space-y-4">
            <h1>Logging you in</h1>
            <p>Redirecting...</p>
          </div>
          <Loader className="size-10 mt-12 animate-spin" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthProvider;
