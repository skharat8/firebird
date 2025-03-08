import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserSession } from "@/services/apiAuth";
import { setLocalStorage } from "@/utils/common.utils";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: deleteUserSession,
    onSettled: () => {
      queryClient.removeQueries();
      setLocalStorage("isAuthenticated", false);

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
