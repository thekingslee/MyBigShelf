import BigLogo from './BigLogo';
import FooterText from './FooterText';
import Instagram from '@/assets/instagram.svg';
import Whatsapp from '@/assets/Whatsapp.svg';
import Qrcode from '@/assets/Q.png';
import { Link } from 'react-router-dom';
// import Twitter from "@/assets/twitter.svg";

const Footer = () => {
  return (
    <section className="px-4 lg:px-0 lg:w-[1000px]">
      <div className="pt-[24px] pb-[40px] grid gap-10 lg:gap-20 grid-rows-[60px_1fr_1fr_1fr] lg:grid-rows-1 lg:grid-cols-4 border-b border-solid border-custom-black-500">
        <div>
          <BigLogo />
        </div>
        <FooterText
          heading="Explore"
          text1={{ title: 'Track Package', link: '/tracker' }}
          text2={{ title: 'Become a partner', link: '/partner' }}
        />
        <FooterText
          heading="BigValues"
          // text1={{ title: 'Privacy Policy', link: '/' }}
          // text2={{ title: 'Terms of use', link: '/' }}
          text1={{ title: 'Return policy', link: '/return-policy' }}
          text2={{ title: 'Shipping policy', link: '/shipping-policy' }}
        />

        <div>
          <FooterText heading="Chat with us" />
          <div className="flex gap-2 items-end mt-4">
            <img
              className="w-[73.574px] h-[73.574px]"
              src={Qrcode}
              alt="Bigshelf QRCode"
            />
            <Link target="blank" to="https://www.instagram.com/mybigshelf">
              <img src={Instagram} alt="Instagram Logo" />
            </Link>
            {/* No twitter account yet */}
            {/* <img src={Twitter} alt="Twitter Logo" /> */}
            <Link
              target="blank"
              to="https://whatsapp.com/channel/0029VaAiS2x8aKvEMb1Pcy3E"
            >
              <img className="my-1" src={Whatsapp} alt="Whatsapp Logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between text-custom-text-body text-xs lg:text-base font-bodyRegularFont mb-4">
        <p>Copyright © 2024 BigShelf All rights reserved.</p>
        <p>Nigeria</p>
      </div>
    </section>
  );
};

export default Footer;
