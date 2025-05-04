import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import styles from "./CarouselX.module.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface slide {
  id: number;
  img: string;
  title: string;
  author: string;
  about: string;
  price: string;
}

type PropType = {
  slides: slide[];
  options?: EmblaOptionsType;
};

const CarouselX: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);

  return (
    <div className={`${styles.embla} w-[300px] md:w-[98vw]`}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div className={`${styles.embla__container}`}>
          {slides.map((s) => (
            <div key={s.id} className={`${styles.embla__slide}`}>
              <div className={`${styles.embla__slide__number}`}>
                <Card className="bg-custom-black-100 w-[300px] md:w-[475px] h-[450px] md:h-[758px] p-[19.5px] lg:p-[40px] !border !border-custom-black-300 rounded-none">
                  <CardHeader>
                    <img
                      className="w-[180px] h-[271px] object-cover"
                      src={s.img}
                      alt="Book Cover"
                    />
                    <p className="text-custom-text-primary text-xl font-headingFont font-semibold">
                      {s.title}
                    </p>
                    <p className="text-custom-text-body text-sm font-bodyRegularFont !mt-0">
                      {s.author}
                    </p>
                    <p className="text-custom-text-primary text-xl font-bodyBoldFont font-semibold">
                      {s.price}
                    </p>
                  </CardHeader>
                  <CardContent className="hidden md:block">
                    <p className="text-custom-text-primary text-base mb-4 font-sans">About this book</p>
                    <p className="text-custom-text-body font-bodyRegularFont text-sm font-light">
                      {s.about}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselX;
