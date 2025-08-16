import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./components/TodoPage/TodoPage";
import ChatPage from "./components/ChatPage/ChatPage";
import AuthProvider from "./providers/AuthProvider";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MusicPage from "./components/MusicPage/MusicPage";
import Layout from "./layout/Layout";

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

      </Routes>
    </>
  );
}

export default App;
