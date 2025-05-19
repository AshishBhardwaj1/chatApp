import { useEffect, useState } from "react";
import io from "socket.io-client";
import API from "../utils/api";
import { useAuth } from "../context/authContext";
import ChatBox from "../components/chatbox";

const socket = io("http://localhost:5000");

export default function ChatPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/auth/users");
      setUsers(res.data.filter(u => u._id !== user.user._id));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (chatWith) {
      API.get(`/messages/${chatWith._id}`).then((res) => setMessages(res.data));
    }

    socket.on("receiveMessage", (msg) => {
      if (msg.senderId === chatWith?._id) {
        setMessages((prev) => [...prev, { sender: msg.senderId, content: msg.content }]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [chatWith]);

  const handleSend = async (content) => {
    const msg = { receiver: chatWith._id, content };
    const res = await API.post("/messages", msg);
    setMessages((prev) => [...prev, res.data]);
    socket.emit("sendMessage", { senderId: user.user._id, receiverId: chatWith._id, content });
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "30%" }}>
        <h3>Users</h3>
        {users.map((u) => (
          <div key={u._id} onClick={() => setChatWith(u)}>{u.name}</div>
        ))}
      </aside>
      <main style={{ width: "70%" }}>
        {chatWith ? (
          <ChatBox messages={messages} onSend={handleSend} />
        ) : (
          <p>Select a user to chat</p>
        )}
      </main>
    </div>
  );
}
