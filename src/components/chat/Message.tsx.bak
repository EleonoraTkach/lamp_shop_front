import "./Message.css";
import { useState } from "react";

export type MessageProp = {
  role: "user" | "assistant";
  text: string;
};

export const Message = ({role, text}: MessageProp) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        {text}
      </div>
	  <button className="copy" onClick={handleCopy}>
      {copied ? "Скопировано ✅" : "📋"}
      </button>
    </div>
  );
};