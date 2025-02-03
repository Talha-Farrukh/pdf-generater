import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import { contactUSFormSchema } from "../schemas/contactUs-schema";
import { EnvUrl } from "../constants/envUrl";

type ContactForm = z.infer<typeof contactUSFormSchema>;

export const usePostContactUs = () => {
  const req = async (data: ContactForm) => {
    const res = await fetch(`${EnvUrl.API_URL}/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to submit contact form");
    }
    return res.json();
  };

  const {
    mutateAsync: submitContact,
    isSuccess: contactSuccess,
    isLoading: contactLoading,
    error: contactError,
    isError,
    reset,
  } = useMutation(req);

  return {
    submitContact,
    contactSuccess,
    contactLoading,
    contactError,
    isError,
    reset,
  };
};

export const useGetContactUs = () => {
  const req = async () => {
    const res = await fetch(`${EnvUrl.API_URL}/contact`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    return res;
  };

  const {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isFetching,
  } = useQuery("contact", req);

  return {
    data,
    isLoading,
    isSuccess,
    error,
    isError,
    isRefetching,
    isFetching,
    refetch,
  };
};
