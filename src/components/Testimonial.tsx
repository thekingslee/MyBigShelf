import Person1 from '@/assets/Person1.svg';
import Person2 from '@/assets/Person2.svg';
import Person3 from '@/assets/Person3.svg';
import Person4 from '@/assets/Person4.svg';
import Testimonials from './Carousel/Testimonials';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
//import CustomButton from "./CustomButton";
// import Apple from "@/assets/Apple.svg";
// import Android from "@/assets/Android.svg";

const Testimonial = () => {
  return (
    <div className="w-full lg:w-[1000px] px-[20px] py-[80px] lg:py-[81px] lg:px-[60px] lg:rounded-[80px] bg-custom-testimonial-bg grid gap-4 grid-rows-2 lg:grid-rows-1 lg:grid-cols-[400px_1fr] justify-center items-center">
      <div className="row-start-2 lg:row-start-1 relative">
        <div className="absolute -top-3 h-10 w-full z-50 bg-custom-testimonial-bg blur-custom"></div>
        <Testimonials />
        <div className="absolute -bottom-3 h-10 w-full z-50 bg-custom-testimonial-bg blur-custom"></div>
      </div>
      <div className="self-start">
        <div className="flex justify-center lg:justify-start">
          <img className="z-0" src={Person1} alt="" />
          <img className="z-10 -ml-5" src={Person2} alt="" />
          <img className="z-20 -ml-5" src={Person3} alt="" />
          <img className="z-30 -ml-5" src={Person4} alt="" />
          <div className="bg-white flex justify-center items-center w-[66px] h-[66px] z-40 -ml-5 text-xl font-sans rounded-full text-custom-text-primary">
            1k
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <p className="text-center lg:text-left md:w-[500px] lg:w-[400px] mt-[30px] text-lg lg:text-2xl text-custom-text-primary font-bold font-bodyBoldFont">
            Join 1000+ readers across Nigeria who have discovered the joy of
            book shopping with BigShelf!{' '}
          </p>
        </div>
        <div className="mt-[10px] flex justify-center lg:justify-start gap-4">
          {/* <CustomButton img={Apple} text="iPhone" />
          <CustomButton img={Android} text="Android" /> */}
          <Link target="blank" to="/">
            <Button className="bg-custom-black-900 flex gap-2 font-poppinsFont text-base lg:text-lg h-[50px] lg:h-[63px] px-[24px] py-[9px] rounded-[13.6px]">
              {' '}
              <ShoppingCart />
              Shop today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
