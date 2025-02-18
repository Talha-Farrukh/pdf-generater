import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { createInvoice } from "../app/actions";
import { toast } from "sonner";

const formSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.date(),
  billTo: z.string().min(1, "Bill to is required"),
  address: z.string().min(1, "Address is required"),
  currency: z.string().min(1, "Currency is required"),
  hours: z.number().min(0, "Hours must be greater than or equal to 0"),
  ratePerHour: z.number().min(0, "Rate must be greater than or equal to 0"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  iban: z.string().min(1, "IBAN is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  cnicNumber: z
    .string()
    .min(13, "CNIC number must be 13 digits")
    .max(13, "CNIC number must be 13 digits"),
});

export type InvoiceFormData = z.infer<typeof formSchema>;

export const useInvoiceForm = (onSubmit: (data: InvoiceFormData) => void) => {
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      currency: "PKR",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
          if (key === "date") {
            form.setValue(key, new Date(parsedData[key]));
          } else {
            form.setValue(key as keyof InvoiceFormData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        localStorage.removeItem("invoiceFormData");
      }
    }
  }, [form]);

  const handleSubmit = async (formData: InvoiceFormData) => {
    try {
      // Save to database using server action
      const result = await createInvoice(formData);

      if (!result.success) {
        const errorMessage = result.error || "Failed to save invoice";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Save to localStorage with serialized date
      const storageData = {
        ...formData,
        date: formData.date.toISOString(),
      };
      localStorage.setItem("invoiceFormData", JSON.stringify(storageData));

      // Show success message
      toast.success("Invoice saved successfully");

      // Call the onSubmit callback
      onSubmit(formData);
    } catch (error) {
      console.error("Failed to save invoice:", error);
      throw error;
    }
  };

  const handleReset = () => {
    form.reset({
      date: new Date(),
      currency: "PKR",
    });
    localStorage.removeItem("invoiceFormData");
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleReset,
  };
};
