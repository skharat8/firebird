import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import type { User } from "@/schemas/auth.zod";
import type { Post } from "@/schemas/post.zod";
import { followUser } from "@/services/apiUser";

function useFollow(userId: string, currentUserId: string) {
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation({
    mutationFn: () => followUser(userId),
    onMutate: async (isFollowedByUser: boolean) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: postKeys.profile(userId) });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(
        postKeys.profile(userId),
      );

      // Optimistically update to the new value
      queryClient.setQueryData(
        postKeys.profile(userId),
        (oldProfile: InfiniteData<{ user: User; posts: Post[] }>) => {
          if (!oldProfile) return oldProfile;

          const updatedPages = oldProfile.pages.map((page, index) => {
            if (index != 0) return;

            return {
              ...page,
              user: {
                ...page.user,
                followers: isFollowedByUser
                  ? page.user.followers.filter(
                      (i) => i.followerId !== currentUserId,
                    )
                  : [
                      ...page.user.followers,
                      { followingId: page.user.id, followerId: currentUserId },
                    ],
                _count: {
                  ...page.user._count,
                  followers: isFollowedByUser
                    ? page.user._count.followers - 1
                    : page.user._count.followers + 1,
                },
              },
            };
          });

          return { ...oldProfile, pages: updatedPages };
        },
      );

      // Return a context object with the snapshotted value
      return { previousProfile };
    },
    onError: (err, _, context) => {
      console.error(err);
      toast.error("Follow action failed. Please try again.", {
        style: { background: "pink" },
      });

      queryClient.setQueryData(
        postKeys.profile(userId),
        context?.previousProfile,
      );
    },
    onSettled: () => {
      // Invalidate the cache to cause displayed components to refetch
      // in order to verify our optimistic updates
      queryClient.invalidateQueries({ queryKey: postKeys.profile(userId) });
      queryClient.invalidateQueries({
        queryKey: postKeys.profile(currentUserId),
      });
    },
  });

  return { follow };
}

export default useFollow;
