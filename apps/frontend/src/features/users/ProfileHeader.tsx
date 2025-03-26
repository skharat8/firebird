import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck, UserRoundCheck, UserRoundPlus } from "lucide-react";

import useUser from "@/hooks/useUser";
import type { User } from "@/schemas/auth.zod";

import FollowButton from "./FollowButton";

function ProfileHeader({ user }: { user?: User }) {
  const { user: currentUser } = useUser();
  const followerIds = user?.followers.map((item) => item.followingId);
  const isFollowing = followerIds?.includes(currentUser?.id ?? "");

  const followButtonVariant = isFollowing ? "primary" : "ghost";
  const followButtonIcon = isFollowing ? UserRoundCheck : UserRoundPlus;

  if (!user) {
    return null;
  }

  return (
    <div
      className="relative mb-4 bg-stone-100 text-neutral-900 dark:bg-stone-700
        dark:text-neutral-50"
    >
      <div>
        <img
          src={user.coverImage}
          alt="Background Cover for User Profile"
          className="h-[20vh] w-full object-cover"
        />
      </div>

      <div className="relative border-b-2 border-b-stone-200 dark:border-b-stone-400">
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
          className="absolute left-[50%] top-4 flex gap-4 font-thin text-neutral-900
            dark:text-neutral-50/80"
        >
          <div>
            <span className="text-secondary-500 font-extrabold">
              {user._count.followers}
            </span>{" "}
            Followers
          </div>
          <div>
            <span className="text-secondary-500 font-extrabold">
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
            <FollowButton icon={followButtonIcon} variant={followButtonVariant}>
              {followButtonVariant === "primary" ? "Following" : "Follow"}
            </FollowButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
