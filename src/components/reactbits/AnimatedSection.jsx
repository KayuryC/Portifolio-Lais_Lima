import { motion, useReducedMotion } from "motion/react";

/**
 * React Bits — "Animated Content" / "Fade Content" pattern.
 * Revela o conteúdo (fade + leve subida) quando entra na viewport.
 * Substitui o IntersectionObserver do site original, respeitando
 * prefers-reduced-motion (renderiza estático, sem movimento).
 */
export default function AnimatedSection({
  as = "div",
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.15,
  ...rest
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
