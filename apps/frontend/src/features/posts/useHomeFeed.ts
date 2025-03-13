import { useInfiniteQuery } from "@tanstack/react-query";

import { postKeys } from "@/data/queryKeys";
import { getHomeFeed } from "@/services/apiUser";

function useHomeFeed() {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: postKeys.home(),
      queryFn: ({ pageParam = "" }) => getHomeFeed(pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 60,
    });

  return { data, isPending, isPaused, fetchNextPage, isFetchingNextPage };
}

export default useHomeFeed;
