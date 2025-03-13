import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomeFeed } from "@/services/apiUser";
import { postKeys } from "@/data/queryKeys";

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
