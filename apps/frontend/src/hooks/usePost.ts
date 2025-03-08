import { getPost } from "@/services/apiPost";
import { useQuery } from "@tanstack/react-query";

function usePost(postId: string) {
  const {
    data: post,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    throwOnError: true,
  });

  if (!isPending && !post) {
    throw Error("No post found");
  }

  return { post, isPending, isSuccess };
}

export default usePost;
