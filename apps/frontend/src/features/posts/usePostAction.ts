import { likePost, retweetPost } from "@/services/apiPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { PostAction } from "@/data/enums";

function usePostAction(postId: string) {
  const queryClient = useQueryClient();

  const { mutate: performPostAction, isPending } = useMutation({
    mutationFn: async (action: PostAction) => {
      switch (action) {
        case PostAction.LIKE:
          return await likePost(postId);
        case PostAction.RETWEET:
          return await retweetPost(postId);
        default:
          throw Error(`Unknown post action provided: ${action}`);
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Action failed. Please try again.", {
        style: { background: "pink" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { performPostAction, isPending };
}

export default usePostAction;
