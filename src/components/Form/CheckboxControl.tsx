/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface CheckboxControlProps {
  control: any;
  name: string;
  label?: string;
  description?: string;
  className?: string;
}

const CheckboxControl: React.FC<CheckboxControlProps> = ({
  control,
  name,
  label,
  description,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-start space-x-3 space-y-0 rounded-md ${className}`}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="leading-none font-bodyRegularFont font-normal font-sm">
            {label && (
              <FormLabel className="text-custom-text-primary">
                {label}
              </FormLabel>
            )}
            {description && (
              <p className="text-sm text-custom-gray_500">{description}</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxControl;
