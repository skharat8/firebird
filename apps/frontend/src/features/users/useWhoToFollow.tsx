import { useQuery } from "@tanstack/react-query";

import { getFollowRecommendations } from "@/services/apiUser";

function useWhoToFollow() {
  const { data, isPending } = useQuery({
    queryKey: ["user", "whoToFollow"],
    queryFn: getFollowRecommendations,
  });

  return { data, isPending };
}

export default useWhoToFollow;
