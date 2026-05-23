import React from "react";
import { useContent } from "../../context/ContentContext";
import "./FloatingContact.css";

export default function FloatingContact() {
  const { globalSettings, contactPage } = useContent();
  const rawPhone = globalSettings?.phone || contactPage?.phone || "81793 05085";
  const phone = rawPhone.replace(/[^\d]/g, "");
  const whatsapp = globalSettings?.socialLinks?.whatsapp || phone;

  return (
    <div className="floating-contact" aria-label="Quick contact actions">
      <a className="floating-contact__btn floating-contact__btn--whatsapp" href={`https://wa.me/91${whatsapp.replace(/^91/, "")}`} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp">
        WA
      </a>
      <a className="floating-contact__btn floating-contact__btn--call" href={`tel:+91${phone.replace(/^91/, "")}`} aria-label="Call ministry">
        Call
      </a>
    </div>
  );
}
