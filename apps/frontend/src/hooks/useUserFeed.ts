import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserFeed } from "@/services/apiUser";

function useUserFeed() {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: ({ pageParam = "" }) => getUserFeed(pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 60,
    });

  return { data, isPending, isPaused, fetchNextPage, isFetchingNextPage };
}

export default useUserFeed;
