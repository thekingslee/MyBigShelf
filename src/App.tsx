import Text from './components/Text';
import NavBar from './components/NavBar';
import AboutBooks from './components/Carousel/AboutBooks';
import Benefits from './components/Benefits';
import Statistic from './components/Statistic';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import ArrowRight from '@/assets/ArrowRight.svg';
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import iPhone from '@/assets/iPhone.svg';
import curvyLine from '@/assets/CurvyLine.svg';
import useGenres from './hooks/useGenre';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { onScrollAnimationConfigs } from './constants/config';
// import CustomButton from "./components/CustomButton";
// import Apple from "@/assets/Apple.svg";
// import Android from "@/assets/Android.svg";

const App = () => {
  const [selectedGenres, setSelectedGenres] = useState<
    { value: string; name: string }[]
  >([]);
  const defaultActionButton = (
    <Link to="/">
      <Button className="w-[248px] h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
        Place an order
      </Button>
    </Link>
  );

  const { data: genresData } = useGenres();

  const statistics = [
    { number: 1300, title: 'Successful Deliveries' },
    { number: 1000, title: 'Happy Customers' },
    { number: 5000, title: 'Books available' },
  ];

  const availableGenres = useMemo(
    () => [
      ...(genresData?.data.genre.map((genre) => ({
        value: genre.name,
        name: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
      })) || []),
    ],
    [genresData]
  );

  const getRandomGenres = () => {
    if (availableGenres.length < 2) {
      return [];
    }

    const shuffledGenres = [...availableGenres].sort(() => 0.5 - Math.random());
    return shuffledGenres.slice(0, 2);
  };

  useEffect(() => {
    const updateGenres = () => {
      setSelectedGenres(getRandomGenres());
    };

    const intervalId = setInterval(updateGenres, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [genresData]);

  // Initial Setup
  useEffect(() => {
    setSelectedGenres(getRandomGenres());
  }, [genresData]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
            duration: 1.5,
          },
        },
      }}
      className="bg-custom-header-bg overflow-y-auto"
    >
      <div className="bg-custom-header-bg">
        <div className="flex flex-col gap-12 lg:gap-16">
          <NavBar actionButtons={defaultActionButton} />
          <motion.div
            variants={onScrollAnimationConfigs.containerVariants}
            initial={onScrollAnimationConfigs.initial}
            whileInView={onScrollAnimationConfigs.whileInView}
            viewport={onScrollAnimationConfigs.viewport}
            className="relative flex justify-center"
          >
            <Text
              align="center"
              header={
                <>
                  A Better way to Nurture a{' '}
                  <span className="text-custom-secondary">Reading Habit.</span>
                </>
              }
            >
              With our curated selection, personalized recommendations, and
              vibrant community, cultivating a habit for reading has never been
              easier.
            </Text>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={onScrollAnimationConfigs.containerVariants}
          initial={onScrollAnimationConfigs.initial}
          whileInView={onScrollAnimationConfigs.whileInView}
          viewport={onScrollAnimationConfigs.viewport}
          className="flex gap-3 justify-center mt-5 mb-[100px]"
        >
          {/* <CustomButton img={Apple} text="iPhone" />
          <CustomButton img={Android} text="Android" /> */}
          <Link to="/">
            <Button className="bg-custom-black-900 flex gap-2 font-poppinsFont text-base lg:text-lg h-[50px] lg:h-[63px] px-[24px] py-[9px] rounded-[13.6px]">
              {' '}
              <ShoppingCart />
              Shop today
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={onScrollAnimationConfigs.containerVariants}
          initial={onScrollAnimationConfigs.initial}
          whileInView={onScrollAnimationConfigs.whileInView}
          viewport={onScrollAnimationConfigs.viewport}
          className="relative flex justify-center"
        >
          <motion.img
            variants={onScrollAnimationConfigs.containerVariants}
            className="w-[180px] lg:w-[auto] relative z-50"
            src={iPhone}
            alt="Bigshelf Iphone"
          />
          <motion.img
            variants={onScrollAnimationConfigs.containerVariants}
            className="absolute -z-5"
            src={curvyLine}
            alt="Bigshelf curvy Line"
          />
        </motion.div>

        <section className="flex justify-center pt-[100px]">
          <Text
            align="center"
            header={
              <>
                Explore our{' '}
                <span className="text-custom-secondary">Bigshelf</span>.{' '}
                <span className="inline lg:block">There's a book for you.</span>
              </>
            }
          >
            Find the right books that match your taste. From{' '}
            <motion.span
              className="font-extrabold text-custom-black-900"
              animate={{ opacity: [0, 1], y: [10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {selectedGenres[0]?.name}
            </motion.span>{' '}
            to{' '}
            <span className="font-extrabold text-custom-black-900">
              {selectedGenres[1]?.name}
            </span>
            , discover new worlds, new ideas, and new adventures in books
            through BigShelf.
          </Text>
        </section>

        {/* Carousel X auto scrolling */}

        <motion.section
          initial="hidden"
          animate={'visible'}
          variants={sectionVariants}
          className="py-[100px]"
        >
          <AboutBooks />
        </motion.section>

        {/* BigShelf Benefits */}
        <section className="bg-custom-black-50 pt-[100px] lg:py-[100px] flex flex-col gap-14">
          <div className="flex justify-center">
            <Text
              align="center"
              header={
                <>
                  Experience{' '}
                  <span className="text-custom-secondary">BigSavings</span> With
                  Every Purchase.
                </>
              }
            >
              Enjoy direct gift delivery, the lowest book prices in Nigeria, and
              free delivery on book hauls, saving you money while expanding your
              reading collection.
            </Text>
          </div>
          <div className="flex justify-center">
            <Benefits />
          </div>
        </section>

        {/* BigEarning Text */}
        <section className="flex flex-col items-center justify-center py-[100px]">
          <Text
            align="center"
            header={
              <>
                Make <span className="text-custom-secondary">BigEarnings</span>
                <br />
                Passively.
              </>
            }
          >
            Join our affiliate program and earn passive income effortlessly.
            BigShelf rewards you with 20% of profits from book sales generated
            through your referrals.
          </Text>
          <Link to="/affiliate">
            <Button
              variant="outline"
              className="mt-[40px] flex items-center gap-2 text-custom-text-primary font-bodyRegularFont text-base lg:text-xl font-medium"
            >
              Become an affiliate
              <img src={ArrowRight} alt="Arrow icon" />
            </Button>
          </Link>
        </section>

        {/* Statistics */}
        <section className="bg-custom-statistic-bg flex flex-col gap-24 py-[100px]">
          <div className="flex justify-center">
            <Text
              align="center"
              header={
                <>
                  Connect with the{' '}
                  <span className="text-custom-secondary">BigCommunity</span>.
                </>
              }
            >
              Share and receive insights, recommendations, and experiences to
              enrich your reading journey together.
            </Text>
          </div>
          <div className="flex flex-col px-14 lg:px-0 md:flex-row gap-10 md:gap-20 justify-center md:items-center">
            {statistics.map((stats) => (
              <Statistic
                key={stats.number}
                number={stats.number}
                title={stats.title}
              />
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="testimonial-linear-bg lg:pb-[100px] flex flex-col justify-center items-center">
          <section className="py-[100px]">
            <Text
              align="center"
              header={
                <>
                  Feel the{' '}
                  <span className="text-custom-secondary">BigLove</span>, Hear
                  from Our Community.
                </>
              }
            >
              Don’t just take our word for it, hear what others have to say.
            </Text>
          </section>
          <Testimonial />
        </section>

        {/* Footer */}
        <footer className="lg:flex lg:justify-center pt-[150px]">
          <Footer />
        </footer>
      </div>
    </motion.div>
  );
};

export default App;
