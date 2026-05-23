import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { ChatbotEngine } from "../../lib/chatbotEngine";
import { trackChatbotQuery } from "../../lib/analytics";
import AnimatedLogo from "../common/AnimatedLogo";
import "./ChatbotWidget.css";

const engine = new ChatbotEngine();
const QUICK_ACTIONS = {
  en: ["About us", "Contact info", "Tribal outreach", "Children's ministry", "Our location"],
  te: ["మా గురించి", "సంప్రదింపు", "గిరిజన సేవ", "పిల్లల పరిచర్య", "మా చిరునామా"]
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { language, ts } = useLanguage();

  useEffect(() => {
    engine.init().then(() => setInitialized(true));
    return () => engine.destroy();
  }, []);

  useEffect(() => { engine.setLanguage(language); }, [language]);

  const addBotMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role: "bot", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0 && initialized) addBotMessage(ts("chatbot_greeting"));
  }, [open, initialized, messages.length, ts, addBotMessage]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
    setTyping(true);
    trackChatbotQuery();
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));
    const response = engine.respond(msg);
    setTyping(false);
    addBotMessage(response.text);
  }, [input, addBotMessage]);

  return (
    <div className="chatbot-widget">
      <button className={`chatbot-fab ${open ? "chatbot-fab--open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label={open ? "Close chat" : "Open chat with Calvary Prema Assistant"} aria-expanded={open}>
        {open ? <span className="chatbot-fab__x">×</span> : <AnimatedLogo src="/logo.svg" size={40} pulse />}
        {!open && messages.length === 0 && <span className="chatbot-fab__badge">1</span>}
      </button>
      <div className={`chatbot-window ${open ? "chatbot-window--open" : ""}`} role="dialog" aria-label="Ministry Chat Assistant" aria-modal="true">
        <div className="chatbot-header">
          <AnimatedLogo src="/logo.svg" size={36} pulse={false} />
          <div className="chatbot-header__info"><div className="chatbot-header__name">Calvary Prema Assistant</div><div className="chatbot-header__status"><span /> Online</div></div>
          <button className="chatbot-header__close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
        </div>
        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((msg) => <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.role}`}><div className="chatbot-msg__bubble">{msg.text}</div><div className="chatbot-msg__time">{msg.time}</div></div>)}
          {typing && <div className="chatbot-msg chatbot-msg--bot"><div className="chatbot-typing"><span /><span /><span /></div></div>}
          <div ref={messagesEndRef} />
        </div>
        {messages.length <= 1 && <div className="chatbot-quick-actions">{(QUICK_ACTIONS[language] || QUICK_ACTIONS.en).map((action) => <button key={action} className="chatbot-quick-btn" onClick={() => sendMessage(action)}>{action}</button>)}</div>}
        <div className="chatbot-input-row">
          <input ref={inputRef} className="chatbot-input" type="text" placeholder={ts("chatbot_placeholder")} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} maxLength={300} />
          <button className="chatbot-send-btn" onClick={() => sendMessage()} disabled={!input.trim()} aria-label={ts("chatbot_send")}>➤</button>
        </div>
      </div>
    </div>
  );
}
