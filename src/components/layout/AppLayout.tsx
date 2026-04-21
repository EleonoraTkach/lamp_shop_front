import { useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { ChatWindow } from "../chat/ChatWindow";
import "./AppLayout.css";

export const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${isOpen ? "open" : "close"}`} >
        <Sidebar />
      </aside>

      {/* overlay всегда рендерится, но просто активируется */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <main className="chat">
        <button
          className="burger"
          onClick={() => setIsOpen(prev => !prev)}
        >
          ☰
        </button>

        <ChatWindow />
      </main>
    </div>
  );
};