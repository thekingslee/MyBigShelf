import Footer from '@/components/Footer';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import NavBar from '@/components/NavBar';
import { Toaster } from 'react-hot-toast';
import BookList from '@/components/BookList';
import ImageCarousel from '@/components/ImageCarousel';
import { CartTray } from '@/components/CartTray';
import CartIcon from '@/components/CartIcon';
import Bag from '@/assets/Bag1.svg';
import { useState } from 'react';

const Bookshop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const bookshopActionButton = (
    <>
      <div className="relative">
        <CartIcon icon={Bag} onClick={() => setIsCartOpen(true)} />
      </div>
      <GoogleSignInButton />
    </>
  );

  return (
    <div className="font-bodyRegularFont bg-custom-black-100 min-h-screen flex flex-col">
      <Toaster />
      <section className="bg-white">
        <NavBar actionButtons={bookshopActionButton} />
      </section>
      <section className="w-full">
        <ImageCarousel />
      </section>
      <section className="flex-grow px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <BookList />
      </section>
      <section className="fixed bottom-4 left-0 right-0 flex justify-center z-10">
        <CartTray isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
      </section>
      <footer className="lg:flex lg:justify-center bg-white pt-[150px]">
        <Footer />
      </footer>
    </div>
  );
};

export default Bookshop;
