import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 24,
  amount = 0.2,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
