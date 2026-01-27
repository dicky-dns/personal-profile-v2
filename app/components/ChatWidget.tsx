"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Halo, Saya Aira! 👋 Asisten chat untuk menjawab semua pertanyaan kamu." }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolling, setIsScrolling] = useState(true);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const bodyOverflowRef = useRef<string | null>(null);

  const setScrollingForMobile = (value: boolean) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 575px)").matches) {
      setIsScrolling(value);
    }
  };

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!window.matchMedia("(max-width: 575px)").matches) {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      }
      return;
    }
    if (!isScrolling) {
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = document.body.style.overflow || "";
      }
      document.body.style.overflow = "hidden";
      return;
    }

    if (bodyOverflowRef.current !== null) {
      document.body.style.overflow = bodyOverflowRef.current;
      bodyOverflowRef.current = null;
    }
  }, [isScrolling]);

  function typeBotMessage(text: string) {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    let messageIndex = -1;
    setMessages(prev => {
      messageIndex = prev.length;
      return [...prev, { from: "bot", text: "" }];
    });

    let pos = 0;
    const speedMs = 20;
    typingTimerRef.current = setInterval(() => {
      pos += 1;
      setMessages(prev => {
        if (!prev[messageIndex]) return prev;
        const nextText = text.slice(0, pos);
        const next = [...prev];
        next[messageIndex] = { ...next[messageIndex], text: nextText };
        return next;
      });

      if (pos >= text.length) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
      }
    }, speedMs);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    typeBotMessage(data.reply);
  }

  function closeChat() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setScrollingForMobile(true);
    }, 200);
  }

  const handleChatOpen = () => {
    setIsOpen(true);
    setScrollingForMobile(false);
  };

  return (
    <>
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-overlay" onClick={closeChat}>
          <div
            className={`chat-panel ${isClosing ? "is-closing" : "is-open"}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="chat-header">
              <button
                onClick={closeChat}
                className="chat-close-mobile"
                aria-label="Close chat"
              >
                <img src="/images/arrow-left.png" alt="Close" />
              </button>
              <span>AI Assistant</span>
              <button
                onClick={closeChat}
                className="chat-close"
                aria-label="Close chat"
              >
                <img src="/images/close-white.svg" alt="Close" />
              </button>
            </div>

            <div className="chat-body" ref={chatBodyRef}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`chat-row ${m.from === "user" ? "is-user" : ""}`}
                >
                  <div
                    className={`chat-bubble ${
                      m.from === "user" ? "is-user" : ""
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-row">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Tulis pertanyaan..."
                className="chat-input"
              />
              <button onClick={sendMessage} className="chat-send">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
          {!isOpen && (
        <button
          onClick={handleChatOpen}
          className="chat-toggle"
        >
          <img src="/images/cat2.png" alt="Chat" />
        </button>
      )}
    </>
  );
}
