import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { db } from "../../lib/firebase";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refetchNotifications } = useOutletContext();

  useEffect(() => { fetchMessages(); }, []);

  async function fetchMessages() {
    setLoading(true);
    try {
      const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id, status) {
    await updateDoc(doc(db, "contactMessages", id), { status });
    setMessages((prev) => prev.map((msg) => msg.id === id ? { ...msg, status } : msg));
    refetchNotifications?.();
  }

  async function remove(id) {
    if (!window.confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "contactMessages", id));
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    refetchNotifications?.();
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2>Contact Messages</h2>
        <p>Messages sent from the public Contact page arrive here for follow-up.</p>
      </div>
      {loading ? <div className="admin-loading">Loading messages...</div> : (
        <div className="admin-message-list">
          {messages.length === 0 ? <div className="admin-empty">No messages yet.</div> : messages.map((msg) => (
            <article className={`admin-message admin-message--${msg.status || "new"}`} key={msg.id}>
              <div className="admin-message__top">
                <div>
                  <h3>{msg.name || "Unknown sender"}</h3>
                  <a href={`mailto:${msg.email}`}>{msg.email}</a>
                </div>
                <span>{msg.createdAt?.toDate?.().toLocaleString?.() || "New message"}</span>
              </div>
              <p>{msg.message}</p>
              <div className="admin-message__actions">
                <select className="admin-select" value={msg.status || "new"} onChange={(e) => setStatus(msg.id, e.target.value)}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="prayer">Prayer Follow-up</option>
                  <option value="closed">Closed</option>
                </select>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(msg.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
