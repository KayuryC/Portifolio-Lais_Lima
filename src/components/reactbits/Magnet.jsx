import { useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * React Bits — "Magnet".
 * O elemento é levemente atraído na direção do cursor, criando uma
 * micro-interação no CTA (sem exagero). Volta suavemente ao sair.
 *
 * Desativado em telas de toque (pointer: coarse) e quando o usuário
 * prefere menos movimento — nesses casos renderiza o filho sem efeito.
 */
export default function Magnet({
  children,
  strength = 0.35,
  className = "",
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isCoarse = useMemo(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const disabled = reduce || isCoarse;

  const handleMove = (e) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <span
      ref={ref}
      className={`magnet ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        display: "inline-flex",
        transform: disabled
          ? undefined
          : `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
