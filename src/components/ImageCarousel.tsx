import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import NewsletterCover from "@/assets/NewsletterCover.png";
import Newsletter3 from "@/assets/Newsletter3.jpg";
import { axiosInstance } from "@/services/api-client";

interface Broadcast {
  _id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  cta?: string;
  dueDate?: string | null;
  location?: string;
}

const staticImages = [
  NewsletterCover,
  Newsletter3,
  NewsletterCover,
  // Add more static image paths as needed
];

const ImageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(),
    Fade(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>(staticImages);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const response = await axiosInstance.get(
          "/broadcasts/?pageNumber=1&pageSize=10"
        );
        const broadcasts: Broadcast[] = response.data.data.broadcasts;
        const broadcastImages = broadcasts.map((broadcast) => broadcast.image);
        setAllImages([...staticImages, ...broadcastImages]);
      } catch (error) {
        console.error("Error fetching broadcasts:", error);
      }
    };

    fetchBroadcasts();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleMouseEnter = useCallback(() => {
    if (emblaApi) emblaApi.plugins().autoplay.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    if (emblaApi) emblaApi.plugins().autoplay.play();
  }, [emblaApi]);

  return (
    <div className="w-full lg:px-0 lg:py-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="lg:px-24">
          <div
            className="overflow-hidden lg:rounded-[24px]"
            ref={emblaRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex">
              {allImages.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[40vh] md:h-[50vh] lg:h-[55vh] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === selectedIndex ? "bg-[#272829]" : "bg-[#D9D9D9]"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;