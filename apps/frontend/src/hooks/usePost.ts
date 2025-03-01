import { getPost } from "@/services/apiPost";
import { useQuery } from "@tanstack/react-query";

function usePost(postId: string) {
  const {
    data: post,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return { post, isPending, isSuccess, isError, error };
}

export default usePost;
