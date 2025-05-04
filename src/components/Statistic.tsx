import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Props {
  number: number;
  title: string;
}

const Statistic = ({ number, title }: Props) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="md:w-[200px] lg:w-[270px] text-custom-text-body font-bodyRegularFont flex flex-col"
    >
      <p className="text-lg lg:text-xl">Up to</p>
      <p className="flex text-custom-text-primary font-bodyBoldFont text-5xl lg:text-7xl font-extrabold">
        <CountUp start={inView ? 0 : undefined} end={number} delay={0}>
          {({ countUpRef }) => (
            <>
              <span ref={countUpRef} />
            </>
          )}
        </CountUp>
        +
      </p>
      <p className="text-xl lg:text-2xl font-bold">{title}</p>
    </div>
  );
};

export default Statistic;
