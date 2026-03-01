/* ------------------------------------------------------------------ */
/*  Shared motion animation variants                                   */
/* ------------------------------------------------------------------ */

export const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
};

export const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};
