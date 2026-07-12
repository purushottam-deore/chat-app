export default function ChatHeader({ username, onlineCount, onLogout }) {
  return (
    <div className="chat-header">
      <div>
        <h2>Realtime Chat</h2>
        <small>
          Logged in as <strong>{username}</strong>
        </small>
      </div>

      <div className="header-right">
        <span>{onlineCount} Online</span>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}