/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectControlProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

const SelectControl: React.FC<SelectControlProps> = ({
  control,
  name,
  label,
  placeholder,
  options,
  onChange,
}) => {
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
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onChange && onChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "h-[48px] text-base font-medium font-bodyMediumFont rounded-lg border bg-white placeholder:font-normal placeholder:font-bodyRegularFont placeholder:text-base !placeholder:text-custom-text-secondary",
                    "data-[placeholder]:text-custom-text-secondary data-[placeholder]:font-base data-[placeholder]:font-bodyRegularFont data-[placeholder]:font-normal",
                    error
                      ? "border-custom-error-300 bg-custom-error-200 focus:bg-custom-error-200 focus:border-custom-error-300"
                      : "border-custom-black-400 focus:bg-custom-info-light focus:border-custom-info focus:ring-transparent text-custom-black-900",
                    "focus:outline-none"
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectControl;
