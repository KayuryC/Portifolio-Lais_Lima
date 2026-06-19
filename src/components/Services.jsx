import AnimatedSection from "./reactbits/AnimatedSection.jsx";
import SpotlightCard from "./reactbits/SpotlightCard.jsx";
import "./Services.css";

const SERVICES = [
  {
    num: "Pessoa física",
    title: "Mentoria de Finanças Pessoais",
    desc: "Acompanhamento individual para organizar suas contas, sair das dívidas, criar o hábito de poupar e dar os primeiros passos nos investimentos com segurança.",
    tag: "Mentoria individual",
  },
  {
    num: "Empresas",
    title: "Consultoria de Finanças Empresariais",
    desc: "Para empreendedores que querem profissionalizar a gestão financeira do negócio: fluxo de caixa, precificação, margem e planejamento com base em dados reais.",
    tag: "Consultoria empresarial",
  },
  {
    num: "No seu ritmo",
    title: "Planilhas & Guias de Investimentos",
    desc: "Materiais prontos para aplicar na hora: planilhas de controle financeiro e guias práticos de investimentos, para quem prefere começar por conta própria.",
    tag: "Produtos digitais",
  },
];

export default function Services() {
  return (
    <section className="services" id="servicos">
      <div className="wrap">
        <AnimatedSection className="section-head">
          <div className="eyebrow light">
            <span className="dash" /> Como posso ajudar
          </div>
          <h2 className="section-title">
            Três caminhos para organizar suas <em>finanças</em>.
          </h2>
          <p className="services-sub">
            Escolha o formato que faz sentido para o seu momento — pessoal,
            empresarial ou no seu próprio ritmo.
          </p>
        </AnimatedSection>

        <AnimatedSection className="services-grid" delay={0.1}>
          {SERVICES.map((service) => (
            <SpotlightCard key={service.title} className="service-card">
              <span className="service-num">{service.num}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="service-tag">{service.tag}</span>
            </SpotlightCard>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
