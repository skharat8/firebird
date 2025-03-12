import { likePost } from "@/services/apiPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useLike(postId: string) {
  const queryClient = useQueryClient();

  const {
    mutate: like,
    isPending: isLikePending,
    variables: likeVariables,
  } = useMutation({
    mutationFn: () => likePost(postId),
    onError: (err) => {
      console.error(err);
      toast.error("Like failed. Please try again.", {
        style: { background: "pink" },
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["post", postId] });
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.refetchQueries({ queryKey: ["post", postId] });
      await queryClient.refetchQueries({ queryKey: ["feed"] });
      await queryClient.refetchQueries({ queryKey: ["profile"] });
    },
  });

  return { like, isLikePending, likeVariables };
}

export default useLike;
