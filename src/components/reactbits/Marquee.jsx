import "./Marquee.css";

/**
 * React Bits — "Marquee" / infinite moving cards.
 * Faixa horizontal que rola continuamente, em loop sem emendas (o conteúdo
 * é duplicado). Pausa no hover e no foco do teclado. Movimento lento e
 * discreto, adequado ao tom sóbrio.
 *
 * Quando o usuário prefere menos movimento, a seção de Depoimentos NÃO monta
 * este componente — usa um grid estático no lugar (ver Testimonials.jsx).
 */
export default function Marquee({ children, duration = 46, className = "" }) {
  return (
    <div className={`marquee ${className}`.trim()}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
