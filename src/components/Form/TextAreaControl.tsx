/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaControlProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const TextAreaControl: React.FC<TextAreaControlProps> = ({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { error } = useFormField();
        return (
          <FormItem>
            {label && (
              <FormLabel className="text-custom-text-primary">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Textarea
                placeholder={placeholder}
                rows={rows}
                {...field}
                className={cn(
                  "h-auto text-base placeholder:font-normal placeholder:font-bodyRegularFont placeholder:text-base placeholder:text-custom-text-secondary text-custom-black-900 rounded-lg border bg-white focus:outline-none",
                  error
                    ? "border-custom-error-300 bg-custom-error-200 focus:bg-custom-error-200 focus:border-custom-error-300"
                    : "border-custom-black-400 focus:bg-custom-info-light focus:border-custom-info focus-visible:ring-transparent",
                  "focus:outline-none",
                  className
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextAreaControl;
