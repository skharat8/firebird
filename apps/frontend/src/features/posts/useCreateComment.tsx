import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import { createComment } from "@/services/apiPost";

function useCreateComment(parentPostId: string) {
  const queryClient = useQueryClient();

  const { mutate: createNewComment, isPending } = useMutation({
    mutationFn: (content: string) => createComment(parentPostId, content),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(parentPostId),
      }),
    onError: (err) => {
      console.error(err);
      toast.error("Uh oh, creating comment failed. Please try again later.", {
        style: { background: "pink" },
      });
    },
  });

  return { createNewComment, isPending };
}

export default useCreateComment;
