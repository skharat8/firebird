import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import { getUserFeed } from "@/services/apiUser";
import UserPost from "@/features/posts/UserPost";
import ErrorPage from "./ErrorPage";

function Home() {
  const {
    data: posts,
    isPending,
    isSuccess,
  } = useQuery({ queryKey: ["feed"], queryFn: getUserFeed });

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      {isPending && <BeatLoader color="#b63b63" />}
      {isSuccess && posts.map((post) => <UserPost key={post.id} post={post} />)}
    </div>
  );
}

export default Home;
