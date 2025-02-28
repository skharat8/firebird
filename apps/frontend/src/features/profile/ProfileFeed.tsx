import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import { getUser } from "@/services/apiUser";
// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";
import PostContent from "../posts/PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

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
      {isSuccess && (
        <div className="mx-auto flex max-w-[65ch] flex-col gap-2">
          <div className="bg-primary-100 -mt-5 h-[20vh]">
            <img src={userAndPosts.user.coverImage} />
          </div>

          <div className="bg-card-400 border-b-1 border-b-card-200 h-30 -mt-5 flex flex-col p-4">
            <Avatar className="border-card-400 -mt-14 mb-2 ml-4 h-20 w-20 border-2">
              <AvatarImage src={userAndPosts.user.profileImage} />
              <AvatarFallback />
            </Avatar>
            <span className="font-bold">{userAndPosts.user.fullName}</span>
            <span className="text-sm font-light text-neutral-600 dark:text-neutral-300">
              @{userAndPosts.user.username}
            </span>{" "}
          </div>
          {userAndPosts.posts.map((post) => (
            <PostContent
              key={post.id}
              post={post}
              hoverShadow={true}
              className="rounded-none"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileFeed;
