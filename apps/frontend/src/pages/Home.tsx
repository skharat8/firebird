import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

import { getUserFeed } from "@/services/apiUser";
import PostContent from "@/features/posts/PostContent";
import PostEditor from "@/features/posts/PostEditor";

function Home() {
  const {
    data: posts,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: getUserFeed,
    staleTime: 1000 * 60,
  });

  return (
    <div className="flex flex-col items-stretch gap-5 p-5">
      {isPending && <GridLoader color="#b63b63" />}
      {isSuccess && (
        <>
          <PostEditor showAvatar={false} className="hidden md:flex" />
          {posts.map((post) => (
            <PostContent key={post.id} post={post} hoverShadow={true} />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
