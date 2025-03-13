import { postKeys } from "@/data/queryKeys";
import type { Post, PostFeedWithPages } from "@/schemas/post.zod";
import { retweetPost } from "@/services/apiPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useRetweet(postId: string, isRetweetedByUser: boolean) {
  const queryClient = useQueryClient();

  const { mutate: retweet } = useMutation({
    mutationFn: () => retweetPost(postId),
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData(postKeys.lists());
      const previousPost = queryClient.getQueryData(postKeys.detail(postId));

      // Optimistically update to the new value
      queryClient.setQueryData(
        postKeys.lists(),
        (oldFeed: PostFeedWithPages) => {
          if (!oldFeed?.pages) return oldFeed;

          const newPages = oldFeed.pages.map((page) => {
            return {
              ...page,
              posts: page.posts.map((post) => {
                return post.id === postId
                  ? {
                      ...post,
                      retweets: isRetweetedByUser ? 0 : 1,
                      _count: {
                        ...post._count,
                        retweets: isRetweetedByUser
                          ? post._count.retweets - 1
                          : post._count.retweets + 1,
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
          retweets: isRetweetedByUser ? 0 : 1,
          _count: {
            ...oldPost._count,
            retweets: isRetweetedByUser
              ? oldPost._count.retweets - 1
              : oldPost._count.retweets + 1,
          },
        };
      });

      // Return a context object with the snapshotted value
      return { previousLists, previousPost };
    },
    onError: (err, _, context) => {
      console.error(err);
      toast.error("Retweet failed. Please try again.", {
        style: { background: "pink" },
      });

      // Roll back optimistic updates on error
      queryClient.setQueryData(postKeys.lists(), context?.previousLists);
      queryClient.setQueryData(postKeys.detail(postId), context?.previousPost);
    },
    onSettled: () => {
      // Invalidate the cache to cause displayed components to refetch
      // in order to verify our optimistic updates
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });

  return { retweet };
}

export default useRetweet;
