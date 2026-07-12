import { useState } from "react";
import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <ChatWindow
      username={username}
      onLogout={logout}
    />
  );
}