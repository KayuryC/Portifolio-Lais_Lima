import { useReducedMotion } from "motion/react";
import AnimatedSection from "./reactbits/AnimatedSection.jsx";
import Marquee from "./reactbits/Marquee.jsx";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    avatar: "M",
    name: "Mariana C.",
    role: "Mentoria de finanças pessoais",
    quote:
      "Antes da mentoria eu não sabia para onde meu dinheiro ia. Hoje tenho controle, saí das dívidas e já comecei a investir. A Laís explica tudo com muita paciência e clareza.",
  },
  {
    avatar: "R",
    name: "Rafael S.",
    role: "Consultoria empresarial",
    quote:
      "A consultoria mudou a forma como eu olho para o meu negócio. Hoje sei exatamente minha margem, meu fluxo de caixa e tomo decisões com muito mais segurança.",
  },
  {
    avatar: "C",
    name: "Camila O.",
    role: "Guia de investimentos",
    quote:
      "As planilhas são simples de usar e fizeram toda diferença na minha organização financeira. Recomendo para quem quer começar a investir sem complicação.",
  },
];

function TestiCard({ quote, avatar, name, role }) {
  return (
    <div className="testi-card">
      <span className="testi-mark" aria-hidden="true">
        &ldquo;
      </span>
      <p className="quote">{quote}</p>
      <div className="testi-person">
        <div className="testi-avatar">{avatar}</div>
        <div>
          <div className="name">{name}</div>
          <div className="role">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();

  const cards = TESTIMONIALS.map((item) => (
    <TestiCard key={item.name} {...item} />
  ));

  return (
    <section className="testimonials" id="depoimentos">
      <div className="wrap">
        <AnimatedSection className="section-head">
          <div className="eyebrow">
            <span className="dash" /> Provas sociais
          </div>
          <h2 className="section-title">
            Resultados de quem já <em>caminhou</em> comigo.
          </h2>
        </AnimatedSection>

        {reduce ? (
          <div className="testi-grid">{cards}</div>
        ) : (
          <Marquee className="testi-marquee">{cards}</Marquee>
        )}
      </div>
    </section>
  );
}
