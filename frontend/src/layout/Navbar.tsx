import { Button } from "@/components/ui/button";
import SignInOAuth from "@/providers/SignInOAuth";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <header className="relative top-0 left-0 w-[200px] bg-gray-300 shadow-md z-50">
      <div className="flex flex-col items-center justify-between space-y-5">
        <SignedOut>
          <SignInOAuth/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <Button
          asChild
          className="hover:bg-red-500 transition-all duration-100 w-full h-[50px]"
        >
          <Link to="/">Todo</Link>
        </Button>

        <Button
          asChild
          className="hover:bg-red-500 transition-all duration-100 w-full h-[50px]"
        >
          <Link to="/chat">Chat</Link>
        </Button>

        <Button
          asChild
          className="hover:bg-red-500 transition-all duration-100 w-full h-[50px]"
        >
          <Link to="/music">Music</Link>
        </Button>
      </div>
    </header>
    <Outlet/>
    </>
  );
};

export default Navbar;
