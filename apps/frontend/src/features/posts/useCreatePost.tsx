import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postKeys } from "@/data/queryKeys";
import { createPost } from "@/services/apiPost";

function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createNewPost, isPending } = useMutation({
    mutationFn: (content: string) => createPost(content),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
    onError: (err) => {
      console.error(err);
      toast.error("Uh oh, creating post failed. Please try again later.", {
        style: { background: "pink" },
      });
    },
  });

  return { createNewPost, isPending };
}

export default useCreatePost;
