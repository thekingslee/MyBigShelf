import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ClipboardCopy, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
}

const OrderSuccessModal = ({
  isOpen,
  orderId,
  onClose,
}: OrderSuccessModalProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTrackOrder = () => {
    navigate(`/tracker?order-id=${orderId}`);
  };

  const checkAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-custom-drawer-close-bg border-2 border-solid border-custom-brand-bg-3 rounded-[8px] w-[95%] mx-auto">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={checkAnimation}
            >
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <DialogTitle className="text-xl font-semibold text-white">
                Order created successfully
              </DialogTitle>
            </motion.div>
          </div>
        </DialogHeader>

        <div className="absolute right-4 top-4">
          <Button
            variant="outline"
            className="w-[25px] h-[25px] rounded-full border border-solid border-custom-brand-bg-3 bg-custom-drawer-close-bg hover:bg-opacity-80"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-white" />
          </Button>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col items-center gap-4 px-4"
        >
          <p className="text-center text-custom-black-50 text-sm sm:text-base">
            Your order has been created with the ID
          </p>
          <div className="flex justify-center items-center flex-wrap gap-2">
            <span className="font-bold text-xl sm:text-2xl text-white break-all text-center">
              {orderId}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(orderId)}
              className="pt-1 hover:bg-opacity-20"
            >
              {isCopied ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-500"
                >
                  Copied!
                </motion.span>
              ) : (
                <ClipboardCopy className="h-5 w-5 text-white hover:text-green-500" />
              )}
            </Button>
          </div>
        </motion.div>

        <DialogFooter className="sm:mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onClose}
            className="w-full bg-custom-cart text-custom-text-primary h-[48px] rounded-[8px] font-bold hover:text-white hover:bg-opacity-90 text-sm sm:text-base"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={handleTrackOrder}
            variant="outline"
            className="w-full h-[48px] rounded-[8px] bg-custom-secondary text-white font-bold border-none hover:bg-white hover:text-custom-drawer-close-bg text-sm sm:text-base"
          >
            Track Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessModal;