/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { isValidImageUrl } from "@/utils";
import Book from "@/assets/picture.png";
import CartIcon from "./CartIcon";
import BagWhite from "@/assets/BagWhite.svg";
import Google from "@/assets/devicon_google.svg";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useViewCart } from "@/hooks/useViewCart";
import { QuantityControl } from "./QuantityControl";
import DeliveryFeeCalculator from "./DeliveryFeeCalculator";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface CartTrayProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DeleteLoadingState {
  [key: string]: boolean;
}

const DRAWER_STATE_KEY = "cartDrawerOpen";

export const CartTray: React.FC<CartTrayProps> = ({
  isOpen: propIsOpen,
  onOpenChange,
}) => {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    isAuthenticated,
    syncCart,
    removeItem,
  } = useCartStore();
  const { isLoading: isSyncing, refetch } = useViewCart();
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<DeleteLoadingState>({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Add keyboard detection
  useEffect(() => {
    const detectKeyboard = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      setKeyboardVisible(windowHeight - viewportHeight > 150);
    };

    window.visualViewport?.addEventListener("resize", detectKeyboard);
    return () =>
      window.visualViewport?.removeEventListener("resize", detectKeyboard);
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem(DRAWER_STATE_KEY);
    if (savedState === "true") {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, []);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  const handleDrawerChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem(DRAWER_STATE_KEY, String(open));
    onOpenChange?.(open);
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(DRAWER_STATE_KEY, "false");
    onOpenChange?.(false);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    localStorage.setItem(DRAWER_STATE_KEY, "true");
    localStorage.setItem("preAuthPath", location.pathname);
    localStorage.setItem("preAuthParams", location.search);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/google/callback`
    );
    const scope = encodeURIComponent(
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
    );
    const state = Math.random().toString(36).substring(7);

    const authorizationUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      "&response_type=code" +
      `&scope=${scope}` +
      `&state=${state}`;

    localStorage.setItem("googleOAuthState", state);
    window.location.href = authorizationUrl;
  };

  const handleDeleteItem = async (itemId: string, quantity: number) => {
    setDeleteLoading((prev) => ({ ...prev, [itemId]: true }));

    try {
      await removeItem(itemId, quantity);
      toast.success("The item has been removed from your cart");
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to remove item from cart");
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      if (isAuthenticated) {
        await syncCart();
      }
      navigate("/checkout");
      handleClose();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        "There was an error processing your checkout. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const CheckoutButton = () => {
    if (isAuthenticated) {
      return (
        <div className="flex justify-center mt-3">
          <Button
            className="w-[200px] sm:w-[252px] h-[48px] bg-custom-cart text-custom-text-primary font-bodyBoldFont font-bold text-base lg:text-lg hover:text-custom-black-50"
            onClick={handleCheckout}
            disabled={checkoutLoading || isSyncing}
          >
            {checkoutLoading || isSyncing ? (
              <ClipLoader color="#000" size={24} />
            ) : (
              "Continue to checkout"
            )}
          </Button>
        </div>
      );
    }
    return (
      <div className="flex justify-center mt-3">
        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-[200px] sm:w-[252px] h-[48px] flex gap-[8px] justify-center items-center text-base lg:text-lg font-medium font-bodyMediumFont bg-custom-cart hover:text-white text-custom-text-primary rounded-[12px]"
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <>
              <img src={Google} alt="Google Icon" />
              <p>Login with Google</p>
            </>
          )}
        </Button>
      </div>
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleDrawerChange}>
      <DrawerTrigger asChild>
        <div
          className={`
            ${getTotalItems() === 0 ? "hidden" : "flex"}
            justify-between items-center bg-custom-cart-tray p-4 text-custom-text-primary cursor-pointer mx-2
            w-full sm:w-[90%] md:w-[80%] lg:w-[750px] h-[60px] sm:h-[70px] md:h-[80px] rounded-[12px] sm:rounded-[18px] md:rounded-[24px]
            transition-all duration-300 ease-in-out
          `}
        >
          {/* Cart preview content */}
          <div
            className="flex gap-2 overflow-x-auto p-2 flex-nowrap w-[70%] sm:w-[75%] md:w-[80%]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative flex-shrink-0"
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl object-cover border-[2px] border-solid border-white"
                    src={
                      item.itemId.bookCover &&
                      isValidImageUrl(item.itemId.bookCover)
                        ? item.itemId.bookCover
                        : Book
                    }
                    alt={item.itemId.title}
                  />
                  <motion.span
                    className="absolute -top-2 -right-2 bg-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {item.quantity}
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-[30%] sm:w-[25%] md:w-[20%] flex-shrink-0 text-white pl-1 sm:pl-3 border-l border-solid border-custom-black-500">
            <span className="text-xs sm:text-sm md:text-base">View cart</span>
            <div className="relative">
              <CartIcon icon={BagWhite} />
            </div>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="h-[90vh] bg-custom-cart-tray border-none outline-none">
        <div className="mx-auto mt-4 h-2 w-[100px] bg-custom-brand-bg-3 rounded-full" />
        <DrawerClose className="block absolute right-4 top-4">
          <Button
            variant="outline"
            className="w-[35px] h-[35px] rounded-full border border-solid border-custom-brand-bg-3 bg-custom-drawer-close-bg"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-white" />
          </Button>
        </DrawerClose>

        {/* Main container with flex column layout */}
        <section className="flex justify-center">
          <div
            ref={contentRef}
            className={`flex flex-col h-[calc(90vh-2rem)] max-h-[calc(90vh-2rem)] max-w-2xl ${
              getTotalItems() === 0
                ? "w-[89%] lg:w-[672px]"
                : "max-w-2xl w-full"
            }`}
            style={{
              height: keyboardVisible
                ? "calc(100vh - 270px)"
                : "calc(90vh-2rem)",
              maxHeight: keyboardVisible
                ? "calc(100vh - 270px)"
                : "calc(90vh-2rem)",
            }}
          >
            {/* Header section */}
            <div className="px-4">
              <DrawerHeader className="gap-0 border-b border-solid border-[#3A4953] px-0">
                <DrawerTitle className="text-custom-black-50 text-xl font-bodyBoldFont font-bold text-left">
                  Your cart
                </DrawerTitle>
                <DrawerDescription className="text-custom-black-300 text-sm font-bodyRegularFont font-normal text-left">
                  {getTotalItems()} books
                </DrawerDescription>
              </DrawerHeader>
            </div>

            {/* Scrollable content area */}
            <div
              className={`flex-1 overflow-y-auto px-4 no-scrollbar ${
                keyboardVisible ? "pb-20" : ""
              }`}
            >
              {items.length === 0 ? (
                <p className="text-left text-custom-black-50 py-4">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4 py-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 lg:items-center"
                    >
                      <div className="flex-shrink-0 relative">
                        <img
                          className="w-20 h-20 rounded-lg border-2 border-solid border-white object-cover shadow-sm"
                          src={
                            item.itemId.bookCover &&
                            isValidImageUrl(item.itemId.bookCover)
                              ? item.itemId.bookCover
                              : Book
                          }
                          alt={item.itemId.title}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                          onClick={() =>
                            handleDeleteItem(item.itemId.id, item.quantity)
                          }
                          disabled={deleteLoading[item.itemId.id]}
                        >
                          {deleteLoading[item.itemId.id] ? (
                            <ClipLoader color="#EF4444" size={14} />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </Button>
                      </div>

                      <div className="flex-grow flex gap-1 flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-3">
                        <div>
                          <h3 className="text-sm lg:text-lg font-bodyBoldFont text-custom-black-50 font-bold line-clamp-1">
                            {item.itemId.title}
                          </h3>
                          <p className="text-xs lg:text-sm font-bodyRegularFont font-normal text-custom-black-300">
                            {item.itemId.author}
                          </p>
                        </div>

                        <div className="flex items-center lg:flex-row-reverse justify-between sm:pr-2 lg:pr-0 lg:gap-14">
                          <QuantityControl
                            item={item.itemId}
                            onStopPropagation={false}
                            iconDark={true}
                            styles={{
                              quantityButtonClassName:
                                "cart-buy-btn bg-custom-cart-tray hover:bg-white border border-solid border-custom-black-50 rounded-[8px] p-0 w-[35px] h-[35px]",
                              inputClassName:
                                "focus:bg-custom-cart-tray focus:border-none w-12 text-center px-1 text-white",
                              quantityTextClassName: isAuthenticated
                                ? "text-custom-black-50"
                                : "text-custom-black-50",
                              loaderColor: "#FAFAFA",
                            }}
                          />
                          <p className="font-bold font-bodyBoldFont text-custom-black-50 text-sm">
                            <span className="font-sans">₦</span>
                            {Number(item.itemId.totalPrice).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fixed footer */}
            <div
              className={`mt-auto bg-custom-cart-tray px-4 py-4 ${
                keyboardVisible ? "fixed bottom-0 left-0 right-0" : ""
              }`}
            >
              <DeliveryFeeCalculator subtotal={getTotalPrice()} />
              <CheckoutButton />
            </div>
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
};
