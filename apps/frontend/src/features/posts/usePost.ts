import { useQuery } from "@tanstack/react-query";

import { postKeys } from "@/data/queryKeys";
import { getPost } from "@/services/apiPost";

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
