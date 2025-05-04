import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Books } from "@/hooks/useAvailableBooks";
import { useCartStore } from "@/stores/cartStore";
import { ClipLoader } from "react-spinners";

interface StyleProps {
  containerClassName?: string;
  buyButtonClassName?: string;
  quantityButtonClassName?: string;
  inputClassName?: string;
  quantityTextClassName?: string;
  loaderColor?: string;
  loaderSize?: number;
}

interface QuantityControlProps {
  item: Books;
  onStopPropagation?: boolean;
  iconDark?: boolean;
  styles?: StyleProps;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  item,
  onStopPropagation = true,
  iconDark = false,
  styles = {},
}) => {
  const { addItem, updateQuantity, removeItem, updateCartQuantity, items } =
    useCartStore();
  const cartItem = items.find((cartItem) => cartItem.itemId.id === item.id);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    containerClassName = "flex items-center justify-between w-[117px] sm:w-[127px]",
    buyButtonClassName = "w-[127px] max-w-[221px] h-[35px] py-[13px] px-4 bg-inherit hover:bg-inherit text-custom-text-primary border border-solid border-custom-text-primary hover:text-white hover:bg-custom-text-primary",
    quantityButtonClassName = "btn rounded-[8px] p-0 w-[35px] bg-transparent h-[35px] border-custom-text-primary hover:bg-custom-text-primary",
    inputClassName = "w-12 text-center px-1 focus:bg-custom-black-100 focus:border-none",
    quantityTextClassName = "cursor-pointer hover:bg-gray-100 px-2 py-1 rounded",
    loaderColor = "#000000",
    loaderSize = 20,
  } = styles;

  const handleClick = async (
    e: React.MouseEvent,
    action: () => Promise<void>
  ) => {
    if (onStopPropagation) {
      e.stopPropagation();
    }
    try {
      setIsLoading(true);
      await action();
    } catch (error) {
      console.error("Error in handleClick:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = () => {
    if (cartItem) {
      return updateQuantity(item.id, cartItem.quantity + 1);
    } else {
      return addItem(item);
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        return updateQuantity(item.id, cartItem.quantity - 1);
      } else {
        return removeItem(item.id);
      }
    }
    return Promise.resolve();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = async () => {
    const newQuantity = parseInt(inputValue);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setIsLoading(true);
      try {
        await updateCartQuantity(item.id, newQuantity);
      } finally {
        setIsLoading(false);
      }
    } else {
      setInputValue(cartItem?.quantity.toString() || "");
    }
    setIsEditing(false);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      input.blur();
    }
  };

  const handleQuantityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setInputValue(cartItem?.quantity.toString() || "");
  };

  if (!cartItem) {
    return (
      <Button
        className={buyButtonClassName}
        onClick={(e) => handleClick(e, () => addItem(item))}
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader size={loaderSize} color={loaderColor} />
        ) : (
          "Buy"
        )}
      </Button>
    );
  }

  return (
    <div className={containerClassName} onClick={(e) => e.stopPropagation()}>
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => handleClick(e, handleDecrement)}
        disabled={isLoading}
        className={quantityButtonClassName}
      >
        {cartItem.quantity > 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            className={`${
              iconDark ? "stroke-[#FAFAFA]" : "stroke-custom-text-primary"
            } hover:stroke-white`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            width="25"
            height="25"
            className={`${
              iconDark ? "stroke-[#FAFAFA]" : "stroke-custom-text-primary"
            } hover:stroke-white`}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="COCO/Line/Plus">
              <path
                id="Vector"
                d="M9.67157 15.3284L15.3284 9.67157M9.67157 9.67157L15.3284 15.3284"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}
      </Button>

      {isLoading ? (
        <ClipLoader size={loaderSize} color={loaderColor} />
      ) : isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
          className={inputClassName}
          autoFocus
        />
      ) : (
        <span onClick={handleQuantityClick} className={quantityTextClassName}>
          {cartItem.quantity}
        </span>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={(e) => handleClick(e, handleIncrement)}
        disabled={isLoading}
        className={quantityButtonClassName}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          className={`${
            iconDark ? "stroke-[#FAFAFA]" : "stroke-custom-text-primary"
          } hover:stroke-white`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="COCO/Line/Plus">
            <path
              id="Vector"
              d="M8.5 12.5H16.5M12.5 8.5L12.5 16.5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </Button>
    </div>
  );
};

export default QuantityControl;
