import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "usehooks-ts";

import type { UserLogin } from "@/schemas/auth.zod";
import { createUserSession } from "@/services/apiAuth";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (loginData: UserLogin) => createUserSession(loginData),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      setIsAuthenticated(true);

      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Login failed. Please try again later.", {
        style: { background: "pink" },
      });
    },
  });

  return { login, isLoginPending };
}

export default useLogin;
