import { lazy, Suspense } from "react";
import { useReducedMotion } from "motion/react";
import SplitText from "./reactbits/SplitText.jsx";
import Magnet from "./reactbits/Magnet.jsx";
import { WHATSAPP_URL } from "../constants.js";
import "./Hero.css";

// Fundo de partículas só entra sob demanda (fora do bundle inicial).
const Particles = lazy(() => import("./reactbits/Particles.jsx"));

// Headline original: "Construa uma <em>relação saudável</em><br>com o seu dinheiro."
const HEADLINE = [
  { text: "Construa" },
  { text: "uma" },
  { text: "relação", em: true },
  { text: "saudável", em: true },
  { break: true },
  { text: "com" },
  { text: "o" },
  { text: "seu" },
  { text: "dinheiro." },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top">
      {!reduce && (
        <Suspense fallback={null}>
          <Particles className="hero-particles" count={80} alpha={0.4} />
        </Suspense>
      )}

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="dash" /> Economista &amp; Consultora Financeira
          </div>
          <h1>
            <SplitText segments={HEADLINE} />
          </h1>
          <p className="hero-sub">
            Mentoria de finanças pessoais e consultoria financeira para
            negócios, com clareza, números reais e um plano que você consegue
            seguir.
          </p>
          <div className="hero-ctas">
            <Magnet>
              <a
                className="btn-primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
              >
                Agendar conversa →
              </a>
            </Magnet>
            <a className="btn-secondary" href="#servicos">
              Ver serviços
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-frame">
            <img
              src="/images/lais-profile.jpg"
              alt="Laís Lima, economista"
              width="420"
              height="560"
              decoding="async"
            />
            <div className="hero-photo-tag">Laís Lima — Economista</div>
          </div>
        </div>
      </div>
    </section>
  );
}
