import React, { useState, useEffect, useRef } from "react";
import Gun from "gun";
import "gun/sea";
import "gun/axe";

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });
const chat = gun.get("meshChat");

export default function ChatRoom() {
  const [loginName, setLoginName] = useState("");
  const [loginAvatar, setLoginAvatar] = useState("");
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("meshMessages") || "[]");
    setMessages(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("meshMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chat.map().on((msg, id) => {
      if (!msg) return;
      setMessages((prev) => {
        if (prev.find((m) => m.id === id)) return prev;
        return [...prev, { id, ...msg }];
      });
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = () => {
    setUser(loginName || `User_${Math.floor(Math.random() * 1000)}`);
    setAvatar(loginAvatar);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = { user, avatar, text: message, timestamp: Date.now() };
    chat.set(msg);
    setMessage("");
  };

  const sendSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg = {
        user,
        avatar,
        text: `🚨 SOS! Location: https://maps.google.com/?q=${latitude},${longitude}`,
        timestamp: Date.now(),
      };
      chat.set(msg);
    });
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    );
  };

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // --- Login Screen ---
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title justify-center">Join Mesh Chat</h1>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full mb-4"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinChat()}
            />
            <input
              type="text"
              placeholder="Avatar URL (optional)"
              className="input input-bordered w-full mb-4"
              value={loginAvatar}
              onChange={(e) => setLoginAvatar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinChat()}
            />
            <button className="btn btn-primary w-full" onClick={joinChat}>
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Chat UI ---
  return (
    <div className="h-screen flex flex-col bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <span className="text-xl font-bold">Mesh Emergency Chat</span>
        </div>
        <div className="flex-none">
          <button onClick={toggleTheme} className="btn btn-sm btn-secondary">
            Toggle Theme
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((msg) => (
            <div
              key={msg.id}
              className={`chat ${
                msg.user === user ? "chat-end" : "chat-start"
              }`}
            >
              {msg.avatar && (
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={msg.avatar || "https://i.pravatar.cc/40"} />
                  </div>
                </div>
              )}
              <div className="chat-header">
                {msg.user}{" "}
                <time className="text-xs opacity-50">
                  {formatTime(msg.timestamp)}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2 border-t bg-base-100">
        <input
          className="input input-bordered flex-grow"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>

      {/* SOS Floating Button */}
      <button
        onClick={sendSOS}
        className="btn btn-error fixed bottom-20 right-6 shadow-lg"
      >
        SOS
      </button>
    </div>
  );
}
