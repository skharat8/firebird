import { useQuery } from "@tanstack/react-query";

import { useLocalStorage } from "usehooks-ts";

import { getCurrentUser } from "@/services/apiUser";

function useUser() {
  const [isAuthenticated] = useLocalStorage("isAuthenticated", false);
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    enabled: isAuthenticated, // Only run this query when user is authenticated
  });

  return { user, isPending, isAuthenticated };
}

export default useUser;
