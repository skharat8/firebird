import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiUser";
import { getCookie } from "@/utils/common.utils";

function useUser() {
  const {
    data: user,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = getCookie("isAuthenticated") === "true";
  return { user, isPending, isSuccess, isAuthenticated };
}

export default useUser;
