import React, { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/specialHooks/useDebounce";

interface CustomInputProps {
  placeholder?: string;
  onInputChange?: (value: string) => void;
  value?: string;
  className?: string;
  isSuccess?: boolean;
}

const CustomSearch: React.FC<CustomInputProps> = ({
  placeholder = "Type here...",
  onInputChange,
  value: externalValue,
  className,
  isSuccess = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(externalValue || "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (externalValue !== undefined) {
      setInputValue(externalValue);
    }
  }, [externalValue]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      onInputChange?.(newValue);
    },
    [onInputChange]
  );

  const handleClearInput = useCallback(() => {
    setInputValue("");
    onInputChange?.("");
  }, [onInputChange]);

  useEffect(() => {
    if (debouncedValue) {
      if (debouncedValue.length === 7) {
        setErrorMessage("");
      } else if (debouncedValue.length < 7) {
        setErrorMessage(
          `Your order ID must be 7 characters. You need ${
            7 - debouncedValue.length
          } more character${7 - debouncedValue.length === 1 ? "" : "s"}.`
        );
      } else {
        setErrorMessage("Your order ID should not exceed 7 characters.");
      }
    } else {
      setErrorMessage("");
    }
  }, [debouncedValue]);

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={cn(
            "pr-10 h-12 text-base text-custom-text-body rounded-lg border bg-white",
            isSuccess
              ? "border-custom-green-300 bg-custom-green-200 focus:bg-custom-green-200 focus:border-custom-green-300"
              : errorMessage
              ? "border-custom-error-300 bg-custom-error-200 focus:bg-custom-error-200 focus:border-custom-error-300"
              : "border-custom-black-400 focus:bg-custom-info-light focus:border-custom-info",
            "focus:outline-none",
            className
          )}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-text-primary">
          {inputValue ? (
            <X className="h-4 w-4 cursor-pointer" onClick={handleClearInput} />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
      </div>
      {errorMessage && (
        <div className="mt-2 text-custom-error-300 text-sm animate-fade-in w-[230px] text-center lg:w-auto">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CustomSearch;