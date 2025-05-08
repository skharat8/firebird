import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck } from "lucide-react";

import useUser from "@/hooks/useUser";
import type { User } from "@/schemas/auth.zod";

import FollowButton from "./FollowButton";
import useFollow from "./useFollow";

function ProfileHeader({ user }: { user: User }) {
  const { user: currentUser } = useUser();
  const { follow } = useFollow(currentUser?.id ?? "");
  const followerIds = user?.followers.map((item) => item.followerId);
  const isFollowing = followerIds?.includes(currentUser?.id ?? "");

  if (!user) {
    return null;
  }

  return (
    <div
      className="bg-card-300 relative mb-4 text-neutral-900 dark:bg-stone-700
        dark:text-neutral-50"
    >
      <div>
        <img
          src={user.coverImage}
          alt="Background Cover for User Profile"
          className="h-[20vh] w-full object-cover"
        />
      </div>

      <div className="relative border-b-2 border-b-stone-400">
        <div className="-top-13 absolute mb-4 ml-8">
          <Avatar>
            <AvatarImage
              src={user.profileImage}
              className="before-h-3 size-24 rounded-[50%] border-4 border-transparent"
            />
            <AvatarFallback />
          </Avatar>
        </div>
        <div
          className="absolute right-4 top-2 flex gap-4 font-thin text-neutral-900
            dark:text-neutral-50/80"
        >
          <div>
            <span className="text-secondary-600 dark:text-secondary-500 font-extrabold">
              {user._count.followers}
            </span>{" "}
            Followers
          </div>
          <div>
            <span className="text-secondary-600 dark:text-secondary-500 font-extrabold">
              {user._count.following}
            </span>{" "}
            Following
          </div>
        </div>

        <div className="flex flex-col px-6 pt-14">
          <span className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {user.fullName}
            <BadgeCheck size={20} fill="var(--color-accent-cyan-600)" />
          </span>
          <span className="mb-4 text-sm font-light text-neutral-700 dark:text-neutral-200">
            @{user.username}
          </span>{" "}
        </div>

        <div className="flex items-center gap-6 px-6 pb-4">
          <span className="mr-auto">{user.bio}</span>
          {currentUser?.id !== user.id && (
            <FollowButton
              initialIsFollowing={isFollowing}
              onFollow={(isFollowing) =>
                follow({ userId: user.id, isFollowedByUser: isFollowing })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
