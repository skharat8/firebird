import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import type { Post, PostFeedWithPages } from "@/schemas/post.zod";
import { likePost } from "@/services/apiPost";

function useLike(postId: string, isLikedByUser: boolean) {
  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: () => likePost(postId),
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      // Snapshot the previous value
      const previousLists = queryClient.getQueriesData({
        queryKey: postKeys.lists(),
      });
      const previousPost = queryClient.getQueryData(postKeys.detail(postId));

      // Optimistically update to the new value
      queryClient.setQueriesData(
        { queryKey: postKeys.lists() },
        (oldFeed: PostFeedWithPages) => {
          if (!oldFeed?.pages) return oldFeed;

          const newPages = oldFeed.pages.map((page) => {
            return {
              ...page,
              posts: page.posts.map((post) => {
                return post.id === postId
                  ? {
                      ...post,
                      likes: isLikedByUser ? [] : [1],
                      _count: {
                        ...post._count,
                        likes: isLikedByUser
                          ? post._count.likes - 1
                          : post._count.likes + 1,
                      },
                    }
                  : post;
              }),
            };
          });

          return { ...oldFeed, pages: newPages };
        },
      );

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
      return { previousLists, previousPost };
    },
    onError: (err, _, context) => {
      console.error(err);
      toast.error("Like failed. Please try again.", {
        style: { background: "pink" },
      });

      // Roll back optimistic updates on error
      queryClient.setQueriesData(
        { queryKey: postKeys.lists() },
        context?.previousLists,
      );
      queryClient.setQueryData(postKeys.detail(postId), context?.previousPost);
    },
    onSettled: () => {
      // Invalidate the cache to cause displayed components to refetch
      // in order to verify our optimistic updates
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });

  return { like };
}

export default useLike;
