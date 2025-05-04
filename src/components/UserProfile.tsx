import React from "react";
import { useCartStore } from "@/stores/cartStore";

const UserProfile: React.FC = () => {
  const { isAuthenticated, userProfile } = useCartStore();

  if (!isAuthenticated || !userProfile) {
    return null;
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("Error loading image:", e);
    e.currentTarget.src = "https://github.com/shadcn.png";
  };

  return (
    <div className="min-w-[200px] max-w-full sm:w-auto h-auto sm:h-[60px] rounded-[12px] bg-custom-black-200 flex flex-row gap-2 sm:gap-1 p-3 sm:px-4 sm:py-[13px] justify-center items-center">
      <img
        src={userProfile.picture}
        alt={userProfile.name}
        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border-2 border-solid border-custom-text-primary"
        onError={handleImageError}
      />
      <div className="flex flex-col items-center sm:items-start">
        <p className="font-bodyBoldFont font-bold text-custom-text-primary text-sm sm:text-base truncate max-w-[150px] sm:max-w-[200px]">
          {userProfile.name}
        </p>
        <p className="text-[10px] sm:text-xs text-custom-text-body font-bodyMediumFont font-medium truncate max-w-[150px] sm:max-w-[200px]">
          {userProfile.email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
