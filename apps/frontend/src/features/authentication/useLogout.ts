import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserSession } from "@/services/apiAuth";
import { useLocalStorage } from "usehooks-ts";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, __, removeIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false,
  );

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: deleteUserSession,
    onSettled: () => {
      queryClient.removeQueries();
      removeIsAuthenticated();

      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong when logging out");
    },
  });

  return { logout, isLogoutPending };
}

export default useLogout;
