import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./components/TodoPage/TodoPage";
import ChatPage from "./components/ChatPage/ChatPage";
import { io } from "socket.io-client";
import { useChatStore, useSocket } from "./stores/useChatStore";
import Navbar from "./layout/Navbar";
import AuthProvider from "./providers/AuthProvider";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MusicPage from "./components/MusicPage/MusicPage";
import Layout from "./layout/Layout";
import Asd from "./components/asd";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthProvider />} />

        <Route path="/" element={<Layout />}>
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/music" element={<MusicPage />} />
        </Route>

        <Route path="/asd" element={<Asd />} />
      </Routes>
    </>
  );
}

export default App;
