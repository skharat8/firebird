import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import { deletePost } from "@/services/apiPost";

function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: removePost, isPending } = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      }, 1000);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Uh oh, deleting post failed. Please try again later.", {
        style: { background: "pink" },
      });
    },
  });

  return { removePost, isPending };
}

export default useDeletePost;
