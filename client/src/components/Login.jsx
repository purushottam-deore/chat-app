import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    localStorage.setItem("username", username);

    onLogin(username);
  };

  return (
    <div className="login-container">
      <h1>Realtime Chat</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
}