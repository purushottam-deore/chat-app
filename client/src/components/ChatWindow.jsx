import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import OnlineUsers from "./OnlineUsers";

export default function ChatWindow({ username, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);

    const bottomRef = useRef(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.emit("join", username);

        loadMessages();

        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("typing", (user) => {
            setTypingUser(user);
        });

        socket.on("stopTyping", () => {
            setTypingUser("");
        });

        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("stopTyping");
            socket.off("onlineUsers");
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    async function loadMessages() {
        try {
            const { data } = await api.get("/messages");

            setMessages(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function sendMessage(text) {
        try {
            const { data } = await api.post("/messages", {
                username,
                message: text
            });

            socket.emit("sendMessage", data);
        } catch (err) {
            console.error(err);
            alert("Unable to send message");
        }
    }

    if (loading) {
    return (
        <div className="loading">
            Loading Messages...
        </div>
    );
}

    return (
        <div className="chat-page">
            <OnlineUsers users={onlineUsers} />

            <div className="chat-container">
                <ChatHeader
                    username={username}
                    onlineCount={onlineUsers.length}
                    onLogout={onLogout}
                />
                <div className="messages">
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            No messages yet.
                            <br />
                            Start the conversation.
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <Message
                                key={msg._id}
                                message={msg}
                                currentUser={username}
                            />
                        ))
                    )}

                    <TypingIndicator user={typingUser} />

                    <div ref={bottomRef}></div>
                </div>

                <MessageInput
                    onSend={sendMessage}
                    socket={socket}
                    username={username}
                />
            </div>
        </div>
    );
}