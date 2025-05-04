import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface slide {
  img: string;
  comment: string;
  name: string;
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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((s) => (
            <div key={s.name} className="embla__slide">
              <div className="embla__slide__number">
                <Card className="bg-custom-testimonial-card-bg md:w-[500px] lg:w-auto shadow-sm border-[1.419px] border-solid border-custom-testimonial-card-border p-2.5 lg:p-[20px]">
                  <CardContent className="p-0 flex flex-col gap-3">
                    <p className="text-custom-text-body font-bodyRegularFont text-sm font-light">
                      {s.comment}
                    </p>
                    <div className="flex gap-1 items-center">
                      <Avatar>
                        <AvatarImage className="object-cover" src={s.img} />
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <p className="text-custom-text-body text-base font-bodyBoldFont font-bold">{s.name}</p>
                    </div>
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
