// DeliveryProgress.tsx
import React from "react";

interface DeliveryProgressProps {
  subtotal: number;
}

const DeliveryProgress: React.FC<DeliveryProgressProps> = ({ subtotal }) => {
  // Constants
  const FREE_DELIVERY_THRESHOLD = 40000;
  const MEDIUM_DELIVERY_THRESHOLD = 20000;

  // Calculate progress percentages
  const calculateProgress = () => {
    const totalProgress = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
    const normalizedProgress = Math.min(totalProgress, 100);
    const firstSegmentMax = (MEDIUM_DELIVERY_THRESHOLD / FREE_DELIVERY_THRESHOLD) * 100;

    let firstSegmentFill = 0;
    let secondSegmentFill = 0;

    if (normalizedProgress <= firstSegmentMax) {
      firstSegmentFill = (normalizedProgress / firstSegmentMax) * 100;
      secondSegmentFill = 0;
    } else {
      firstSegmentFill = 100;
      secondSegmentFill = ((normalizedProgress - firstSegmentMax) / firstSegmentMax) * 100;
    }

    return {
      firstSegmentFill,
      secondSegmentFill,
      deliveryFee:
        subtotal >= FREE_DELIVERY_THRESHOLD
          ? 0
          : subtotal >= MEDIUM_DELIVERY_THRESHOLD
          ? 3000
          : 6000,
    };
  };

  const { firstSegmentFill, secondSegmentFill } = calculateProgress();

  // Get delivery fee indicator background color
  const getDeliveryFeeBackground = () => {
    if (subtotal >= MEDIUM_DELIVERY_THRESHOLD) {
      return "bg-[#22F6DC] !text-[#0F1A23]";
    }
    return "bg-[#0F1A23] text-[#BDBDBD]";
  };

  // Get free delivery indicator styles
  const getFreeDeliveryStyles = () => {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      return "bg-[#FCC400] text-[#0F1A23] border-custom-yellow-300";
    }
    return "bg-[#0F1A23] text-[#BDBDBD]";
  };

  return (
    <div className="flex items-center w-full gap-1">
      {/* First segment (0 to 20000) */}
      <div className="w-full h-1 relative">
        <div className="absolute inset-0 border-t-4 rounded-full border-custom-cart opacity-30" />
        <div
          className="absolute inset-0 border-t-4 rounded-full border-custom-aqua-200 transition-all duration-300"
          style={{
            width: `${firstSegmentFill}%`,
          }}
        />
      </div>

      {/* Delivery fee indicator */}
      <span
        className={`flex-shrink-0 inline-block w-auto py-[2px] text-xs font-bodyMediumFont font-medium rounded-full px-3 text-custom-text-body ${getDeliveryFeeBackground()}`}
      >
        {`3K`}
      </span>

      {/* Second segment (20000 to 40000) */}
      <div className="w-full h-1 relative">
        <div className="absolute inset-0 border-t-4 rounded-full border-custom-yellow-300 opacity-30" />
        <div
          className="absolute inset-0 border-t-4 rounded-full border-custom-yellow-300 transition-all duration-300"
          style={{
            width: `${secondSegmentFill}%`,
          }}
        />
      </div>

      {/* Free delivery indicator */}
      <span 
        className={`flex-shrink-0 inline-block rounded-full font-bodyMediumFont font-medium px-3 py-[3px] ${getFreeDeliveryStyles()} text-xs`}
      >
        Free
      </span>
    </div>
  );
};

export default DeliveryProgress;