import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * React Bits — "Split Text".
 * Revela o headline palavra a palavra (fade + subida), com stagger suave,
 * preservando o timing tranquilo do site original. Palavras marcadas com
 * `em: true` viram <em> (mantendo o destaque itálico/dourado do <em> do H1).
 *
 * `segments`: array de { text } | { text, em: true } | { break: true }
 *
 * Respeita prefers-reduced-motion: renderiza o texto estático, sem animação.
 */
export default function SplitText({
  segments,
  delay = 0.25,
  stagger = 0.05,
  duration = 0.6,
  y = 18,
}) {
  const reduce = useReducedMotion();

  const lastWordIndex = segments.reduce(
    (acc, seg, i) => (seg.break ? acc : i),
    0
  );

  let wordCount = -1;

  return segments.map((seg, i) => {
    if (seg.break) return <br key={`b-${i}`} />;

    wordCount += 1;
    const trailingSpace = i < lastWordIndex ? " " : "";

    if (reduce) {
      return (
        <Fragment key={i}>
          {seg.em ? <em>{seg.text}</em> : seg.text}
          {trailingSpace}
        </Fragment>
      );
    }

    const Tag = seg.em ? motion.em : motion.span;
    return (
      <Fragment key={i}>
        <Tag
          style={{ display: "inline-block", willChange: "transform" }}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + wordCount * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {seg.text}
        </Tag>
        {trailingSpace}
      </Fragment>
    );
  });
}
