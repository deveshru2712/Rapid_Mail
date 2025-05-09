import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

interface FormfieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
}

const Formfield = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  type,
}: FormfieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-lg font-semibold text-white">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            className="text-xl h-12 font-semibold placeholder:text-white active:outline-none"
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default Formfield;
