import { postKeys } from "@/data/queryKeys";
import { getPost } from "@/services/apiPost";
import { useQuery } from "@tanstack/react-query";

function usePost(postId: string) {
  const {
    data: post,
    isPending,
    isPaused,
  } = useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
  });

  return { post, isPending, isPaused };
}

export default usePost;
