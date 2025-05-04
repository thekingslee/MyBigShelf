/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const InputControl = ({
  control,
  name,
  label,
  placeholder,
  readOnly = false,
  type = "text",
}: {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { error } = useFormField();
        return (
          <FormItem>
            <FormLabel className="text-custom-black_800 text-sm font-bodyMediumFont">
              {label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  autoComplete="off"
                  readOnly={readOnly}
                  placeholder={placeholder}
                  {...field}
                  type={
                    type === "password" && !showPassword ? "password" : "text"
                  }
                  className={cn(
                    "pr-10 h-[48px] text-base font-medium font-bodyMediumFont text-custom-black-900 rounded-lg border bg-white placeholder:font-normal placeholder:font-bodyRegularFont placeholder:text-base placeholder:text-custom-text-secondary",
                    error
                      ? "border-custom-error-300 bg-custom-error-200 focus:bg-custom-error-200 focus:border-custom-error-300"
                      : "border-custom-black-400 focus:bg-custom-info-light focus:border-custom-info",
                    "focus:outline-none"
                  )}
                />
                {type === "password" && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputControl;
