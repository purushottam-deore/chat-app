import { useState } from "react";

export default function MessageInput({
  onSend,
  socket,
  username
}) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);

    socket.emit("typing", username);

    setTimeout(() => {
      socket.emit("stopTyping");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    setText("");

    socket.emit("stopTyping");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
      />

      <button>Send</button>
    </form>
  );
}