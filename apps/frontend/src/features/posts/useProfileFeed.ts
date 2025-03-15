import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { postKeys } from "@/data/queryKeys";
import type { Post } from "@/schemas/post.zod";
import { getUser } from "@/services/apiUser";

function useProfileFeed(userId: string) {
  const queryClient = useQueryClient();

  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: postKeys.profile(userId),
      queryFn: async ({ pageParam = "" }) => {
        const data = await getUser(userId, pageParam);

        // Initialize cache entries for individual posts
        data?.posts.forEach((post) =>
          queryClient.setQueryData<Post>(postKeys.detail(post.id), post),
        );

        return data;
      },
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 60,
    });

  return { data, isPending, isPaused, fetchNextPage, isFetchingNextPage };
}

export default useProfileFeed;
