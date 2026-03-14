"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      from: "bot",
      text: "Halo, Saya Aira! 👋 Asisten chat untuk menjawab semua pertanyaan kamu."
    }
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolling, setIsScrolling] = useState(true);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const bodyOverflowRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const setScrollingForMobile = (value: boolean) => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(max-width: 575px)").matches) {
      setIsScrolling(value);
    }
  };

  // scroll to bottom
  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isOpen]);

  // mobile body scroll lock
  useEffect(() => {
    if (typeof document === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 575px)").matches;

    if (!isMobile) {
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

  // viewport fix mobile keyboard
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isOpen) return;

    const isMobile = window.matchMedia("(max-width: 575px)").matches;
    if (!isMobile) return;

    const updateViewportVars = () => {
      const viewport = window.visualViewport;
      const height = viewport ? viewport.height : window.innerHeight;
      const offsetTop = viewport ? viewport.offsetTop : 0;

      document.documentElement.style.setProperty("--chat-vh", `${height}px`);
      document.documentElement.style.setProperty(
        "--chat-vv-offset",
        `${offsetTop}px`
      );
    };

    updateViewportVars();

    window.addEventListener("orientationchange", updateViewportVars);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewportVars);
      window.visualViewport.addEventListener("scroll", updateViewportVars);
    }

    return () => {
      window.removeEventListener("orientationchange", updateViewportVars);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportVars);
        window.visualViewport.removeEventListener("scroll", updateViewportVars);
      }
    };
  }, [isOpen]);

  // handle BACK button
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        closeChat();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  // cleanup typing timer
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  function typeBotMessage(text: string) {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    const id = crypto.randomUUID();

    setMessages(prev => [...prev, { id, from: "bot", text: "" }]);

    let pos = 0;

    typingTimerRef.current = setInterval(() => {
      pos++;

      setMessages(prev =>
        prev.map(msg =>
          msg.id === id ? { ...msg, text: text.slice(0, pos) } : msg
        )
      );

      if (pos >= text.length && typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    }, 20);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      from: "user",
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      typeBotMessage(data.reply);
    } catch {
      typeBotMessage("Maaf terjadi kesalahan.");
    }
  }

  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = "auto";

    const maxHeight = parseFloat(getComputedStyle(el).maxHeight || "0");
    const nextHeight = Math.min(el.scrollHeight, maxHeight || el.scrollHeight);

    el.style.height = `${nextHeight}px`;
  };

  useEffect(() => {
    resizeInput();
  }, [input]);

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

    // push state supaya back button menutup chat dulu
    window.history.pushState({ chatOpen: true }, "");
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
                {messages.map(m => (
                  <div
                    key={m.id}
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
                <div className="chat-input-wrap">
                  <textarea
                    ref={inputRef}
                    value={input}
                    rows={1}
                    className="chat-input"
                    placeholder="Tulis pertanyaan..."
                    onChange={e => {
                      setInput(e.target.value);
                      resizeInput();
                    }}
                    onKeyDown={e => {
                      if (e.key !== "Enter") return;

                      const isMobile =
                        typeof window !== "undefined" &&
                        window.matchMedia("(max-width: 575px)").matches;

                      if (isMobile) return;

                      if (!e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />

                  <button
                    onClick={sendMessage}
                    className="chat-send"
                    aria-label="Send"
                  >
                    <img src="/images/arrow-right.png" alt="Send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleChatOpen}
        className={`chat-toggle ${isOpen ? "is-hidden" : "is-visible"}`}
        style={{ cursor: "url(/images/cpointer.png) 4 4, pointer" }}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
      >
        <img src="/images/cat.png" alt="Chat" />
      </button>
    </>
  );
}