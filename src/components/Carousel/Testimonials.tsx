import React from "react";
import CarouselY from "./CarouselY";
import { EmblaOptionsType } from "embla-carousel";
import "./CarouselY.css";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";
import img12 from "@/assets/12.jpg";
import img13 from "@/assets/13.jpg";
import img14 from "@/assets/14.jpg";
import img15 from "@/assets/15.jpg";

const Testimonials: React.FC = () => {
  const OPTIONS: EmblaOptionsType = { loop: true, axis: "y" };
  const SLIDES = [
    {
      img: img1,
      comment: `I was impressed by the prompt delivery of my books from BigShelf. It arrived in perfect condition and right on time!`,
      name: "Adewale Johnson",
    },
    {
      img: img2,
      comment: `BigShelf's delivery service is top-notch! I received my order faster than I expected, and the packaging was excellent.`,
      name: "Tari Omowale",
    },
    {
      img: img3,
      comment: `The books I ordered from BigShelf were of excellent quality. The paper, printing, and binding were all top-notch.`,
      name: "Ezenwata Ikenna",
    },
    {
      img: img4,
      comment: `I'm impressed by the high standard of books available on BigShelf. The quality is on par with what you'd find in a bookstore.`,
      name: "Onoriode Akeem-omosanya",
    },
    {
      img: img5,
      comment: `The book quality from BigShelf is fantastic! I feel like I'm getting the bookstore experience without leaving my home.`,
      name: "Rotimi Tamunoemi ",
    },
    {
      img: img6,
      comment: `Thanks to BigShelf's affiliate program, I've been able to earn money while supporting a platform I believe in. It's a win-win!`,
      name: "Okafor Nelson",
    },
    {
      img: img7,
      comment: `Sending books as gifts through BigShelf is so convenient. My friends and family have loved receiving personalized book gifts from me.`,
      name: "Damilare Akinyemi",
    },
    {
      img: img8,
      comment: `BigShelf's direct gift delivery service is a game-changer. I've used it multiple times to surprise my loved ones with thoughtful gifts.`,
      name: "Chisom Ogunbanwo",
    },
    {
      img: img9,
      comment: `Participating in BigShelf's book hauls has been a great way to save money on delivery fees. Plus, it's fun to receive a bundle of books all at once!`,
      name: "Olufunmi Oluwaseyi",
    },
    {
      img: img10,
      comment: `I love taking part in BigShelf's book hauls. It's a cost-effective way to stock up on books while enjoying free delivery.`,
      name: "Juliet Isaac",
    },
    {
      img: img11,
      comment: `I'm impressed by the competitive prices on BigShelf. I've found great deals on books that I wouldn't have been able to afford otherwise.`,
      name: "Aminat Mathew",
    },
    {
      img: img12,
      comment: `I've noticed a significant improvement in my reading habits since I started using BigShelf. Reading has become an essential part of my daily routine. Grateful to finally start building a personal library.`,
      name: "Happiness Oladipupo",
    },
    {
      img: img13,
      comment: `BigShelf has helped me discover a vibrant community of book lovers in Nigeria. It's great to connect with like-minded individuals who share my passion for reading.`,
      name: "Isaac Gambo",
    },
    {
      img: img14,
      comment: `I've been using BigShelf to buy books for my book club, and it's been a game-changer. The bulk order discounts are a lifesaver!`,
      name: "Anthony Samson",
    },
    {
      img: img15,
      comment: `I love how BigShelf promotes literacy initiatives and supports local literary talent. It's inspiring to see a platform making a positive impact.`,
      name: "Michael Abba",
    },
  ];
  return <CarouselY slides={SLIDES} options={OPTIONS} />;
};

export default Testimonials;
