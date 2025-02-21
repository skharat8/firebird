import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import { getUser } from "@/services/apiUser";
// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";
import UserPost from "../posts/UserPost";

function ProfileFeed({ userId }: { userId: string }) {
  const {
    data: userAndPosts,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUser(userId),
  });

  if (isError) {
    return <ErrorPage customError={error} />;
  }

  return (
    <div className="flex flex-col items-stretch gap-5">
      {isPending && <BeatLoader color="#b63b63" />}
      {isSuccess &&
        userAndPosts.posts.map((post) => (
          <UserPost key={post.id} post={post} />
        ))}
    </div>
  );
}

export default ProfileFeed;
