import { useInfiniteQuery } from "@tanstack/react-query";

import { postKeys } from "@/data/queryKeys";
import { getUser } from "@/services/apiUser";

function useProfileFeed(userId: string) {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: postKeys.profile(userId),
      queryFn: ({ pageParam = "" }) => getUser(userId, pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 60,
    });

  return { data, isPending, isPaused, fetchNextPage, isFetchingNextPage };
}

export default useProfileFeed;
