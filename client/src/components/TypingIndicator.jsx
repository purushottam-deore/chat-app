export default function TypingIndicator({ user }) {
  if (!user) return null;

  return (
    <div className="typing">
      {user} is typing...
    </div>
  );
}