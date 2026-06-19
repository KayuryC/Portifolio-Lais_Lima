import { useRef } from "react";
import "./SpotlightCard.css";

/**
 * React Bits — "Spotlight Card".
 * Brilho radial dourado, sutil, que acompanha o cursor sobre o card.
 * Sem dependências (CSS custom properties + um listener de mousemove).
 * Acessível por teclado: o brilho também aparece em :focus-within.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(184, 145, 91, 0.15)",
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onMouseMove={handleMove}
      style={{ "--spot": spotlightColor }}
    >
      <span className="spotlight-card__glow" aria-hidden="true" />
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
}
