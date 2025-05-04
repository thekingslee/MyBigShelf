import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CarouselXFramer.scss';
import { Books } from '@/hooks/useAvailableBooks';
import { Link } from 'react-router-dom';

interface CarouselXProps {
  books: Books[];
}

const CarouselX: React.FC<CarouselXProps> = ({ books }) => {
  const slides = Array.isArray(books)
    ? books.map((item) => item.bookCover)
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const LeftId = (currentSlide - 1 + slides.length) % slides.length;
  const CenterId = currentSlide;
  const RightId = (currentSlide + 1) % slides.length;

  const prevBtn = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextBtn = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const variants = {
    center: {
      x: '0rem',
      opacity: 1,
      scale: 1.1,
      zIndex: '5',
      filter: 'brightness(100%)',
      // backgroundImage: 'url(' + slides[CenterId] + ')',
      boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.3)',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    left: {
      x: '-6rem',
      opacity: 1,
      filter: 'brightness(40%)',
      scale: 1,
      // backgroundImage: 'url(' + slides[LeftId] + ')',
      zIndex: '4',
      boxShadow: 'unset',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    right: {
      // backgroundImage: 'url(' + slides[RightId] + ')',
      x: '6rem',
      opacity: 1,
      filter: 'brightness(40%)',
      scale: 1,
      boxShadow: 'unset',
      zIndex: '3',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    rightHidden: {
      x: '8rem',
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: '-8rem',
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div className="carousel-wrapper">
      <motion.div className="carousel-content">
        <AnimatePresence initial={false}>
          <motion.div
            key={LeftId}
            variants={variants}
            initial="leftHidden"
            animate="left"
            exit="leftHidden"
            className="carousel-item p-2 bg-custom-black-900 overflow-clip"
          >
            <Link to={`/?item-id=${books[LeftId]?.id}`}>
              <img
                src={slides[LeftId]}
                alt=""
                className="h-full w-full object-cover rounded-3xl"
              />
            </Link>
          </motion.div>
          <motion.div
            key={CenterId}
            variants={variants}
            initial="right"
            animate="center"
            className="carousel-item p-2 bg-white overflow-clip"
          >
            <Link to={`/?item-id=${books[CenterId]?.id}`}>
              <img
                src={slides[CenterId]}
                alt=""
                className="h-full w-full object-cover rounded-3xl"
              />
            </Link>
          </motion.div>
          <motion.div
            key={RightId}
            variants={variants}
            initial="center"
            animate="right"
            exit="rightHidden"
            className="carousel-item p-2 bg-custom-black-900 overflow-clip"
          >
            <Link to={`/?item-id=${books[RightId]?.id}`}>
              <img
                src={slides[RightId]}
                alt=""
                className="h-full w-full object-cover rounded-3xl"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="carousel-btns">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="bwd-btn bg-custom-black-900 font-poppins"
          onClick={prevBtn}
        >
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="fwd-btn bg-custom-black-900"
          onClick={nextBtn}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CarouselX;
