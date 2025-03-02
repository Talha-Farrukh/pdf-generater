"use client";

import { RefreshCcw, Plus, Trash2 } from "lucide-react";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TextFormField,
  NumberFormField,
  DateFormField,
  CurrencyFormField,
} from "./form/FormFields";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";

export function InvoiceForm() {
  const { form, handleSubmit, handleReset, addProject, removeProject, isSubmitting } = useInvoiceForm();
  
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  // Watch the projects array to ensure it's properly displayed
  const watchedProjects = useWatch({
    control: form.control,
    name: "projects",
  });

  // Ensure projects are displayed when form is loaded with data
  useEffect(() => {
    // If we have projects data but no fields are showing, force update the fields
    if (watchedProjects?.length > 0 && fields.length === 0) {
      replace(watchedProjects);
    }
  }, [watchedProjects, fields.length, replace]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Invoice Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="invoiceNumber"
                label="Invoice Number"
                placeholder="INV-001"
              />
              <DateFormField control={form.control} name="date" label="Date" />
            </div>

            <TextFormField
              control={form.control}
              name="billTo"
              label="Bill To"
              placeholder="Client Name"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Client Address"
              />
              <CurrencyFormField
                control={form.control}
                name="currency"
                label="Currency"
              />
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Projects</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addProject}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </div>
              
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Project {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <TextFormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    label="Description"
                    placeholder="Project Description"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <NumberFormField
                      control={form.control}
                      name={`projects.${index}.hours`}
                      label="Hours"
                      placeholder="0"
                    />
                    <NumberFormField
                      control={form.control}
                      name={`projects.${index}.ratePerHour`}
                      label="Rate per Hour"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="bankName"
                label="Bank Name"
                placeholder="Bank Name"
              />
              <TextFormField
                control={form.control}
                name="accountNumber"
                label="Account Number"
                placeholder="Account Number"
              />
              <TextFormField
                control={form.control}
                name="iban"
                label="IBAN"
                placeholder="IBAN"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="branchName"
                label="Branch Name"
                placeholder="Branch Name (Optional)"
              />
              <TextFormField
                control={form.control}
                name="branchAddress"
                label="Branch Address"
                placeholder="Branch Address (Optional)"
              />
            </div>

            <TextFormField
              control={form.control}
              name="accountHolderName"
              label="Account Holder Name"
              placeholder="Account Holder Name"
            />

            <TextFormField
              control={form.control}
              name="contactNumber"
              label="Contact Number"
              placeholder="+92 XXX XXXXXXX"
            />

            <TextFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="email@example.com"
            />

            <TextFormField
              control={form.control}
              name="cnicNumber"
              label="CNIC Number"
              placeholder="XXXXXXXXXXXXX"
            />

            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Generating..." : "Generate Invoice"}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
