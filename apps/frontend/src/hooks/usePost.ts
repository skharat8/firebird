import { getPost } from "@/services/apiPost";
import { useQuery } from "@tanstack/react-query";

function usePost(postId: string) {
  const { data: post, isPending } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return { post, isPending };
}

export default usePost;
