import { useMutation } from "react-query";
import { z } from "zod";
import { EnvUrl } from "../constants/envUrl";
import { LoginFormSchema } from "../schemas/login-schema";
import { getCookie } from "../lib/cookie";

type LoginForm = z.infer<typeof LoginFormSchema>;

export const useLogin = () => {
  const req = async (data: LoginForm) => {
    const res = await fetch(`${EnvUrl.API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to login");
    }
    return res.json();
  };

  const {
    data,
    mutateAsync: submitLogin,
    isSuccess: loginSuccess,
    isLoading: loginLoading,
    error: loginError,
    isError,
    reset,
  } = useMutation(req);

  return {
    data,
    submitLogin,
    loginSuccess,
    loginLoading,
    loginError,
    isError,
    reset,
  };
};

export const useLogOut = () => {
  const req = async () => {
    const res = await fetch(`${EnvUrl.API_URL}/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to login");
    }
    return res.json();
  };

  const {
    mutateAsync: submitLogout,
    isSuccess: logOutSuccess,
    isLoading: logOutLoading,
    error: loginError,
    isError,
    reset,
  } = useMutation(req);

  return {
    submitLogout,
    logOutSuccess,
    logOutLoading,
    loginError,
    isError,
    reset,
  };
};
