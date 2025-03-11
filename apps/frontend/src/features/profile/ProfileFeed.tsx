import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

import { getUser } from "@/services/apiUser";
import PostContent from "../posts/PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import Offline from "@/components/ui/Offline";

function ProfileFeed({ userId }: { userId: string }) {
  const {
    data: userAndPosts,
    isPending,
    isPaused,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUser(userId),
  });

  return (
    <div className="flex flex-col items-center gap-5">
      {isPending && (isPaused ? <Offline /> : <GridLoader color="#b63b63" />)}
      {userAndPosts && (
        <div className="mx-auto flex max-w-[65ch] flex-col gap-2">
          <div className="bg-card">
            <img
              src={userAndPosts.user.coverImage}
              alt="Background Cover for User Profile"
              className="h-[20vh] w-full object-cover"
            />
          </div>

          <div className="bg-card border-b-1 border-b-card h-30 -mt-5 flex flex-col p-4">
            <Avatar className="border-card -mt-14 mb-2 h-20 w-20 border-2">
              <AvatarImage src={userAndPosts.user.profileImage} />
              <AvatarFallback />
            </Avatar>
            <span className="font-bold">{userAndPosts.user.fullName}</span>
            <span className="text-sm font-light text-neutral-600 dark:text-neutral-200">
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
