export default function Message({ message, currentUser }) {
  const ownMessage = message.username === currentUser;

  return (
    <div className={ownMessage ? "message own" : "message"}>
      <div className="message-header">
        <strong>{message.username}</strong>
        <span>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="message-text">{message.message}</div>
    </div>
  );
}