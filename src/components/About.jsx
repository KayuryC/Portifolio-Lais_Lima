import AnimatedSection from "./reactbits/AnimatedSection.jsx";
import "./About.css";

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="wrap about-grid">
        <AnimatedSection className="about-photo">
          <div className="about-photo-inner">
            <img
              src="/images/lais-sofa.jpg"
              alt="Laís Lima sorrindo, ambiente acolhedor"
              width="540"
              height="560"
              loading="lazy"
              decoding="async"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="about-text" delay={0.1}>
          <div className="eyebrow">
            <span className="dash" /> Sobre mim
          </div>
          <h2 className="section-title about-title">
            Economista de formação, guia de quem quer{" "}
            <em>clareza financeira</em>.
          </h2>
          <p>
            Sou economista e trabalho ajudando pessoas e empresas a entenderem o
            próprio dinheiro — sem fórmulas mágicas, sem julgamento, com números
            reais e decisões possíveis de sustentar.
          </p>
          <p>
            Acredito que finanças saudáveis começam com clareza: saber para onde
            o dinheiro vai, o que é possível mudar e qual é o próximo passo certo
            para o seu momento. É esse processo que conduzo em cada mentoria e
            consultoria.
          </p>
          <ul className="focus-list">
            <li>
              <span className="tick" /> Diagnóstico financeiro honesto, sem
              achismo
            </li>
            <li>
              <span className="tick" /> Planos adaptados à realidade de cada
              pessoa ou negócio
            </li>
            <li>
              <span className="tick" /> Acompanhamento próximo, não só uma
              planilha pronta
            </li>
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
