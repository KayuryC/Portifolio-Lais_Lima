import { lazy, Suspense } from "react";
import { useReducedMotion } from "motion/react";
import Magnet from "./reactbits/Magnet.jsx";
import {
  WHATSAPP_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
} from "../constants.js";
import "./Contact.css";

const Particles = lazy(() => import("./reactbits/Particles.jsx"));

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section className="contact" id="contato">
      {!reduce && (
        <Suspense fallback={null}>
          <Particles className="contact-particles" count={70} alpha={0.35} />
        </Suspense>
      )}

      <div className="wrap">
        <div className="eyebrow light contact-eyebrow">
          <span className="dash" /> Vamos conversar
        </div>
        <h2 className="section-title contact-title">
          Pronto para organizar sua <em>vida financeira</em>?
        </h2>
        <p className="contact-sub">
          Me manda uma mensagem e vamos entender juntas qual caminho faz mais
          sentido para o seu momento.
        </p>
        <div className="contact-ctas">
          <Magnet>
            <a
              className="btn-primary"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              Falar no WhatsApp →
            </a>
          </Magnet>
        </div>
        <div className="contact-links">
          <a
            className="contact-link"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
          >
            <span className="label">WhatsApp</span>
            {PHONE_DISPLAY}
          </a>
          <a
            className="contact-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
          >
            <span className="label">Instagram</span>
            {INSTAGRAM_HANDLE}
          </a>
          <a className="contact-link" href={EMAIL_HREF}>
            <span className="label">E-mail</span>
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
