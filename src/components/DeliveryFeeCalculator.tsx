// DeliveryFeeCalculator.tsx
import React from "react";
import DeliveryProgress from "./DeliveryProgress";

interface DeliveryFeeCalculatorProps {
  subtotal: number;
}

const DeliveryFeeCalculator: React.FC<DeliveryFeeCalculatorProps> = ({
  subtotal,
}) => {
  // Constants
  const FREE_DELIVERY_THRESHOLD = 40000;
  const MEDIUM_DELIVERY_THRESHOLD = 20000;
  const HIGH_DELIVERY_FEE = 6000;
  const MEDIUM_DELIVERY_FEE = 3000;

  // Calculate delivery fee and remaining amount
  const calculateDeliveryInfo = () => {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      return {
        deliveryFee: 0,
        remaining: 0,
        progress: 100,
      };
    } else if (subtotal >= MEDIUM_DELIVERY_THRESHOLD) {
      const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
      const progress = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
      return {
        deliveryFee: MEDIUM_DELIVERY_FEE,
        remaining,
        progress,
      };
    } else {
      const remaining = MEDIUM_DELIVERY_THRESHOLD - subtotal;
      const progress = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
      return {
        deliveryFee: HIGH_DELIVERY_FEE,
        remaining,
        progress,
      };
    }
  };

  const { deliveryFee } = calculateDeliveryInfo();

  // Get appropriate message based on the current state
  const getMessage = () => {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      return "Your delivery is free";
    } else if (subtotal >= MEDIUM_DELIVERY_THRESHOLD) {
      const remainingToFree = FREE_DELIVERY_THRESHOLD - subtotal;
      return `You are ₦${remainingToFree.toLocaleString()} away from Free delivery`;
    } else {
      const remainingTo3k = MEDIUM_DELIVERY_THRESHOLD - subtotal;
      return `You are ₦${remainingTo3k.toLocaleString()} away from 3K delivery`;
    }
  };

  return (
    <div className="w-full bg-custom-drawer-close-bg border border-solid border-custom-brand-bg-3 rounded-[8px] p-4">
      {/* Subtotal Row */}
      <div className="flex justify-between text-custom-black-50 text-sm lg:text-base font-bodyMediumFont font-medium">
        <span>Subtotal</span>
        <span className="font-sans">₦{subtotal.toLocaleString()}</span>
      </div>

      {/* Delivery Fee Row */}
      <div className="flex justify-between text-custom-black-50 text-sm lg:text-base font-bodyMediumFont font-medium">
        <span>Delivery</span>
        <span
          className={
            deliveryFee === 0
              ? "text-custom-yellow-300 font-sans"
              : "text-white font-sans"
          }
        >
          {deliveryFee === 0 ? "0.00" : `₦${deliveryFee.toLocaleString()}`}
        </span>
      </div>

      {/* Progress Bar and Message */}
      <div className="relative pt-2">
        <DeliveryProgress subtotal={subtotal} />

        <p className="text-custom-black-300 mt-2 font-sans font-normal text-[10px] lg:text-sm text-center">
          {getMessage()}
        </p>
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;
