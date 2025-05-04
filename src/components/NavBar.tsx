import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BigLogo from './BigLogo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Menu from '@/assets/Menu.svg';
import BigShelfLogo from '../assets/LOGO.svg';
import GoogleSignInButton from './GoogleSignInButton';
// import CartIcon from "./CartIcon";
// import Bag from "@/assets/Bag1.svg";

interface NavBarProps {
  actionButtons: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ actionButtons }) => {
  const navList = [
    { id: 1, name: 'About', to: '/about' },
    { id: 2, name: 'Track Package', to: '/tracker' },
    { id: 3, name: 'Partner with us', to: '/partner' },
  ];

  return (
    <div className="flex items-center justify-between lg:w-[1100px] p-4 lg:mx-auto">
      <div className="flex gap-10 items-center">
        <BigLogo />
        <ul className="hidden lg:flex lg:items-center lg:text-custom-text-body">
          {navList.map((list) => (
            <li key={list.id}>
              <Link to={list.to}>
                <Button
                  variant="link"
                  className="text-custom-text-body text-lg font-medium font-bodyMediumFont"
                >
                  {list.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Sheet>
        <div className="flex gap-5 items-center lg:hidden">
          {/* <div className="relative">
            <CartIcon icon={Bag} />
          </div> */}
          <SheetTrigger className="lg:hidden">
            <img src={Menu} alt="Menu Icon" />
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-[300px] flex flex-col lg:hidden">
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <Link className="flex gap-1 pl-2" to="/">
              <img src={BigShelfLogo} alt="BigShelf Logo" />
              <h3 className="font-headingFont font-semibold text-2xl text-custom-black_800 my-2">
                BigShelf
              </h3>
            </Link>

            {/* Navigation Links */}
            <ul className="mt-8 flex gap-6 flex-col text-custom-text-body">
              {navList.map((list) => (
                <li key={list.id}>
                  <Link to={list.to}>
                    <Button
                      variant="link"
                      className="text-custom-text-body text-xl font-bodyMediumFont"
                    >
                      {list.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fixed Bottom Section */}
          <div className="mt-auto border-t border-gray-200 pt-4 space-y-4">
            <Link target="blank" to="/">
              <Button className="w-full h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
                Place an order
              </Button>
            </Link>
            <div className="pb-4">
              <GoogleSignInButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden lg:flex gap-6 items-center">{actionButtons}</div>
    </div>
  );
};

export default NavBar;
