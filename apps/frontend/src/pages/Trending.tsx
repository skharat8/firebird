import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import ScrollBox from "@/components/ui/ScrollBox";
import FollowButton from "@/features/users/FollowButton";
import useFollow from "@/features/users/useFollow";
import useWhoToFollow from "@/features/users/useWhoToFollow";
import useUser from "@/hooks/useUser";

const TRENDS = [
  { id: "1", name: "OutfitIdeas", numPosts: "20K" },
  { id: "2", name: "KeanuReeves", numPosts: "14K" },
  { id: "3", name: "ScenicBeaches", numPosts: "8K" },
  { id: "4", name: "SixFlags", numPosts: "2.3K" },
  { id: "5", name: "Playstation", numPosts: "1.8K" },
];

function Trending() {
  const { user: currentUser } = useUser();
  const { follow } = useFollow(currentUser?.id ?? "");

  const { data: users, isPending } = useWhoToFollow();

  return (
    <div className="flex h-full w-[90%] flex-col gap-6 px-6 py-4">
      <ScrollBox title="Who To Follow" data={users} isPending={isPending}>
        {(user) => (
          <div className="flex w-full items-center justify-center gap-2">
            <Link
              to={`/profile/${user.id}`}
              className="mr-auto flex w-fit items-center gap-4 text-current hover:text-current"
            >
              <Avatar>
                <AvatarImage src={user.profileImage} />
                <AvatarFallback />
              </Avatar>
              {user.fullName}
            </Link>

            <FollowButton
              initialIsFollowing={false}
              onFollow={(isFollowing) =>
                follow({ userId: user.id, isFollowedByUser: isFollowing })
              }
            />
          </div>
        )}
      </ScrollBox>

      <ScrollBox title="Trending" data={TRENDS} isPending={false}>
        {(trend) => (
          <div className="flex flex-col">
            {trend.name}
            <div className="text-sm text-neutral-300">
              {trend.numPosts} posts
            </div>
          </div>
        )}
      </ScrollBox>
    </div>
  );
}

export default Trending;
