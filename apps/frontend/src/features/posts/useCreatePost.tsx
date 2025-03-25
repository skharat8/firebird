import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createPost } from "@/services/apiPost";

function useCreatePost() {
  const { mutate: createNewPost, isPending } = useMutation({
    mutationFn: (content: string) => createPost(content),
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
