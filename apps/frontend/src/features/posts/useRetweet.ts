import { retweetPost } from "@/services/apiPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useRetweet(postId: string) {
  const queryClient = useQueryClient();

  const {
    mutate: retweet,
    isPending: isRetweetPending,
    variables: retweetVariables,
  } = useMutation({
    mutationFn: () => retweetPost(postId),
    onError: (err) => {
      console.error(err);
      toast.error("Retweet failed. Please try again.", {
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

  return { retweet, isRetweetPending, retweetVariables };
}

export default useRetweet;
