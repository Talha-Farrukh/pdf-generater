import { useMutation, useQuery } from "react-query";
import { EnvUrl } from "../constants/envUrl";
import { InsightSchema } from "../schemas/insights-schema";
import { toast } from "../components/ui/use-toast";
import { redirect } from "next/navigation";
import { z } from "zod";

type InsightForm = z.infer<typeof InsightSchema>;


export const useInsights = (limit : number) => {  const req = async () => {
    const res = await fetch(`${EnvUrl.API_URL}/insights?limit=${limit}`, {
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
  } = useQuery("insights", req);

  return {
    data,
    length: data?.data?.length || 0,
    isLoading,
    isSuccess,
    error,
    isError,
    isRefetching,
    isFetching,
    refetch,
  };
};

export const useInsightsByMonthAndYear = (month: string, year: string) => {
  const req = async () => {
    const res = await fetch(
      `${EnvUrl.API_URL}/insightsByMonthAndYear/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
  } = useQuery("insightsbymonthandyear", req);

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


export const usePostInsight = () => {
  const req = async (data: InsightForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle.toISOString());
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("url", data.url);
    formData.append("longDescription", data.longDescription);

    const res = await fetch(`${EnvUrl.API_URL}/insights`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      // throw new Error("Failed to submit blog form");
      const error = await res.json();
      if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return res.json();
  };

  const {
    mutateAsync: submitBlog,
    isSuccess: blogSuccess,
    isLoading: blogLoading,
    error: blogError,
    isError,
    reset,
  } = useMutation(req);

  const { refetch } = useInsights(1000);

  if (blogSuccess) {
    toast({
      title: "Success",
      description: "Insight added successfully",
      variant: "success",
    });
    redirect("/admin/insights");
    refetch();
    reset();
  }
  if (isError) {
    toast({
      title: "Error",
      description: `${blogError}`,
      variant: "destructive",
    });
  }

  return {
    submitBlog,
    blogSuccess,
    blogLoading,
    blogError,
    isError,
    reset,
  };
};


export const useDeleteInsight = () => {
  const req = async (id: string) => {
    const res = await fetch(`${EnvUrl.API_URL}/insights?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json();
      if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return res.json();
  };

  const {
    mutateAsync: deleteBlog,
    isSuccess: blogSuccess,
    isLoading: blogLoading,
    error: blogError,
    isError,
    reset,
  } = useMutation(req);

  const { refetch } = useInsights(1000);

  if (blogSuccess) {
    toast({
      title: "Success",
      description: "Insight deleted successfully",
      variant: "success",
    });
    refetch();
    reset();
  }
  if (isError) {
    toast({
      title: "Error",
      description: `${blogError}`,
      variant: "destructive",
    });
  }

  return {
    deleteBlog,
    blogSuccess,
    blogLoading,
    blogError,
    isError,
    reset,
  };
};