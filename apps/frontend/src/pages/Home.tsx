import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import { getUserFeed } from "@/services/apiUser";
import PostContent from "@/features/posts/PostContent";
import PostEditor from "@/features/posts/PostEditor";

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

function Home() {
  const {
    data: posts,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: getUserFeed,
  });

  return (
    <div className="flex flex-col items-stretch gap-5 p-5">
      {isPending && <BeatLoader color="#b63b63" />}
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
