import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactForm() {
  const { ts, language } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", prayerRequest: false });
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || form.message.trim().length < 8) {
      setStatus(language === "te" ? "దయచేసి సరైన వివరాలు నమోదు చేయండి." : "Please enter valid contact details.");
      return;
    }
    try {
      await addDoc(collection(db, "contactMessages"), { ...form, createdAt: serverTimestamp(), status: "new" });
      await addDoc(collection(db, "notifications"), {
        type: "contact",
        title: form.prayerRequest ? "New prayer request received" : "New contact message received",
        message: `${form.name} sent a message from the contact page.`,
        read: false,
        createdAt: serverTimestamp()
      });
      setForm({ name: "", phone: "", email: "", message: "", prayerRequest: false });
      setStatus(language === "te" ? "మీ సందేశం అందింది. ధన్యవాదాలు." : "Your message has been received. Thank you.");
    } catch (err) {
      setStatus(language === "te" ? "సందేశం పంపలేకపోయాం. దయచేసి ఫోన్ ద్వారా సంప్రదించండి." : "Could not send message. Please contact us by phone.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder={ts("name_placeholder")} required />
      <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder={language === "te" ? "మీ ఫోన్ నంబర్" : "Your Phone Number"} required />
      <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={ts("email_placeholder")} />
      <textarea rows={6} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder={ts("message_placeholder")} required />
      <label className="contact-form__check"><input type="checkbox" checked={form.prayerRequest} onChange={(e) => setForm((p) => ({ ...p, prayerRequest: e.target.checked }))} /> {language === "te" ? "ఇది ప్రార్థన అభ్యర్థన" : "This is a prayer request"}</label>
      <button type="submit">{ts("send_message")}</button>
      {status && <p className="contact-form__status">{status}</p>}
    </form>
  );
}
