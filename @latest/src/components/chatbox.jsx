
import { useState } from "react";

export default function ChatBox({ messages, onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender?.name || "You"}:</strong> {msg.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
