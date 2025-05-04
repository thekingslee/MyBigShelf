export const onScrollAnimationConfigs = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      type: 'spring',
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  },
  childVariants: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  },
  viewport: { amount: 0.3 },
  whileInView: 'visible',
  initial: 'hidden',
};
