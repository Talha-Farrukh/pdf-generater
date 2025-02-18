import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { ChangeEvent } from "react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";
import { InvoiceFormData } from "../../hooks/useInvoiceForm";

interface FormFieldProps {
  control: Control<InvoiceFormData>;
  name: keyof InvoiceFormData;
  label: string;
  placeholder?: string;
}

export const TextFormField = ({
  control,
  name,
  label,
  placeholder,
}: FormFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            value={field.value as string}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NumberFormField = ({
  control,
  name,
  label,
  placeholder,
}: FormFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type="number"
            step="0.01"
            placeholder={placeholder}
            {...field}
            value={field.value as number}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              field.onChange(e.target.value ? Number(e.target.value) : 0)
            }
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const DateFormField = ({ control, name, label }: FormFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value as Date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value as Date}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CurrencyFormField = ({ control, name, label }: FormFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value as string}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="PKR">PKR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
