import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { postKeys } from "@/data/queryKeys";
import type { Post } from "@/schemas/post.zod";
import { getPost } from "@/services/apiPost";

function usePost(postId: string, forceRefetch?: boolean) {
  const queryClient = useQueryClient();

  if (forceRefetch) {
    queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
  }

  const {
    data: post,
    isPending,
    isPaused,
  } = useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: async () => {
      const post = await getPost(postId);

      // If comments exist, initialize cache entries for them
      post?.comments?.forEach((comment) =>
        queryClient.setQueryData<Post>(postKeys.detail(comment.id), comment),
      );

      return post;
    },
  });

  return { post, isPending, isPaused };
}

export default usePost;
