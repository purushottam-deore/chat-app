export default function OnlineUsers({ users }) {
  return (
    <div className="online-users">
      <h3>Online</h3>

      {users.map((user) => (
        <p key={user}>🟢 {user}</p>
      ))}
    </div>
  );
}