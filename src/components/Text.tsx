import { ReactNode } from 'react';
// import { motion } from 'framer-motion';
// import { onScrollAnimationConfigs } from '../constants/config.ts';

interface Props {
  header: ReactNode;
  children: ReactNode | string;
  align?: string;
  className?: string;
}

const Text = ({ header, children, className, align = 'left' }: Props) => {
  return (
    <div
      className={`w-[300px] md:w-[400px] lg:w-[842px] flex flex-col gap-4 md:items-${align}`}
    >
      <h2
        className={`font-headingFont font-semibold text-${align} md:text-${align} text-3xl md:text-4xl lg:text-6xl text-custom-black-900`}
      >
        {header}
      </h2>
      <p
        className={`w-full ${className} text-custom-text-body text-${align} md:text-${align} font-bodyRegularFont text-base md:text-xl`}
      >
        {children}
      </p>
    </div>
  );
};

export default Text;
