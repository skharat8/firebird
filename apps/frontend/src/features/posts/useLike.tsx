import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import type { Post } from "@/schemas/post.zod";
import { likePost } from "@/services/apiPost";

function useLike(postId: string) {
  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: () => likePost(postId),
    onMutate: async (isLikedByUser: boolean) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(postKeys.detail(postId));

      // Optimistically update to the new value
      queryClient.setQueryData(postKeys.detail(postId), (oldPost: Post) => {
        if (!oldPost) return oldPost;

        return {
          ...oldPost,
          likes: isLikedByUser ? [] : [1],
          _count: {
            ...oldPost._count,
            likes: isLikedByUser
              ? oldPost._count.likes - 1
              : oldPost._count.likes + 1,
          },
        };
      });

      // Return a context object with the snapshotted value
      return { previousPost };
    },
    onError: (err, _, context) => {
      console.error(err);
      toast.error("Like failed. Please try again.", {
        style: { background: "pink" },
      });

      queryClient.setQueryData(postKeys.detail(postId), context?.previousPost);
    },
    onSettled: () => {
      // Invalidate the cache to cause displayed components to refetch
      // in order to verify our optimistic updates
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });

  return { like };
}

export default useLike;
