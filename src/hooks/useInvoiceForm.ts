"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { createInvoice } from "../app/actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// Define the project schema
const projectSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Project description is required"),
  hours: z.number().min(0, "Hours must be greater than or equal to 0"),
  ratePerHour: z.number().min(0, "Rate must be greater than or equal to 0"),
});

export type ProjectData = z.infer<typeof projectSchema>;

const formSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.date(),
  billTo: z.string().min(1, "Bill to is required"),
  address: z.string().min(1, "Address is required"),
  currency: z.string().min(1, "Currency is required"),
  // Replace hours and ratePerHour with projects array
  projects: z.array(projectSchema).min(1, "At least one project is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  iban: z.string().min(1, "Sort code is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  branchName: z.string().optional().nullable(),
  branchAddress: z.string().optional().nullable(),
  cnicNumber: z
    .string()
    .min(13, "CNIC number must be 13 digits")
    .max(13, "CNIC number must be 13 digits"),
});

export type InvoiceFormData = z.infer<typeof formSchema>;

export const useInvoiceForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: "",
      date: new Date(),
      billTo: "",
      address: "",
      currency: "PKR",
      projects: [
        {
          id: crypto.randomUUID(),
          description: "",
          hours: 0,
          ratePerHour: 0,
        },
      ],
      bankName: "",
      accountNumber: "",
      iban: "",
      accountHolderName: "",
      contactNumber: "",
      email: "",
      cnicNumber: "",
      branchName: "",
      branchAddress: "",
    },
  });

  useEffect(() => {
    // First check for search params
    if (searchParams.size > 0) {
      const formData: Partial<InvoiceFormData> = {
        branchName: searchParams.get("branchName") || "",
        branchAddress: searchParams.get("branchAddress") || "",
        invoiceNumber: searchParams.get("invoiceNumber") || "",
        billTo: searchParams.get("billTo") || "",
        address: searchParams.get("address") || "",
        currency: searchParams.get("currency") || "PKR",
        bankName: searchParams.get("bankName") || "",
        accountNumber: searchParams.get("accountNumber") || "",
        iban: searchParams.get("iban") || "",
        accountHolderName: searchParams.get("accountHolderName") || "",
        contactNumber: searchParams.get("contactNumber") || "",
        email: searchParams.get("email") || "",
        cnicNumber: searchParams.get("cnicNumber") || "",
      };

      // Try to parse projects from search params
      try {
        const projectsParam = searchParams.get("projects");
        if (projectsParam) {
          const parsedProjects = JSON.parse(projectsParam);
          if (Array.isArray(parsedProjects)) {
            // Ensure each project has an id
            const projectsWithIds = parsedProjects.map(project => ({
              ...project,
              id: project.id || crypto.randomUUID(),
              // Ensure numeric values
              hours: typeof project.hours === 'number' ? project.hours : parseFloat(project.hours),
              ratePerHour: typeof project.ratePerHour === 'number' ? project.ratePerHour : parseFloat(project.ratePerHour)
            }));
            formData.projects = projectsWithIds;
          }
        }
      } catch (error) {
        console.error("Failed to parse projects from URL:", error);
      }

      // Set form values from URL params
      Object.keys(formData).forEach((key) => {
        if (formData[key as keyof InvoiceFormData] !== undefined) {
          form.setValue(key as keyof InvoiceFormData, formData[key as keyof InvoiceFormData]!);
        }
      });

      // Set date separately
      const dateParam = searchParams.get("date");
      if (dateParam) {
        try {
          form.setValue("date", new Date(dateParam));
        } catch (error) {
          console.error("Failed to parse date:", error);
        }
      }
    } else {
      // Check for saved form data in localStorage
      const savedData = localStorage.getItem("invoiceFormData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // Convert date string back to Date object
          if (parsedData.date) {
            parsedData.date = new Date(parsedData.date);
          }
          // Set form values from localStorage
          Object.keys(parsedData).forEach((key) => {
            form.setValue(key as keyof InvoiceFormData, parsedData[key]);
          });
        } catch (error) {
          console.error("Failed to parse saved form data:", error);
          localStorage.removeItem("invoiceFormData");
        }
      }
    }
  }, [form, searchParams, router]);

  // This is the key fix - define the submit handler properly
  const onSubmit = async (data: InvoiceFormData) => {
    try {
      setIsSubmitting(true);
      
      // Save form data to localStorage for persistence
      const storageData = {
        ...data,
        date: data.date.toISOString(),
      };
      localStorage.setItem("invoiceFormData", JSON.stringify(storageData));
      
      // Send data to server
      const result = await createInvoice(data);
      
      if (result.success) {
        toast.success("Invoice generated successfully!");
        router.push(`/${result.id}`);
      } else {
        toast.error(`Failed to save invoice: ${result.error}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset({
      invoiceNumber: "",
      date: new Date(),
      billTo: "",
      address: "",
      currency: "PKR",
      projects: [
        {
          id: crypto.randomUUID(),
          description: "",
          hours: 0,
          ratePerHour: 0,
        },
      ],
      bankName: "",
      accountNumber: "",
      iban: "",
      accountHolderName: "",
      contactNumber: "",
      email: "",
      cnicNumber: "",
      branchName: "",
      branchAddress: "",
    });
    localStorage.removeItem("invoiceFormData");
  };

  const addProject = () => {
    const currentProjects = form.getValues("projects") || [];
    form.setValue("projects", [
      ...currentProjects,
      {
        id: crypto.randomUUID(),
        description: "",
        hours: 0,
        ratePerHour: 0,
      },
    ]);
  };

  const removeProject = (index: number) => {
    const currentProjects = form.getValues("projects");
    if (currentProjects.length <= 1) {
      toast.error("At least one project is required");
      return;
    }
    
    const updatedProjects = [...currentProjects];
    updatedProjects.splice(index, 1);
    form.setValue("projects", updatedProjects);
  };

  return {
    form,
    handleSubmit: onSubmit, // Return the onSubmit function directly
    handleReset,
    addProject,
    removeProject,
    isSubmitting,
  };
};
