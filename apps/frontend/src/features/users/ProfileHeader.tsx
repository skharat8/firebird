import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import type { User } from "@/schemas/auth.zod";

function ProfileHeader({ user }: { user?: User }) {
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="bg-card">
        <img
          src={user.coverImage}
          alt="Background Cover for User Profile"
          className="h-[20vh] w-full object-cover"
        />
      </div>

      <div className="bg-card border-b-1 border-b-card h-30 -mt-5 flex flex-col p-4">
        <Avatar className="border-card -mt-14 mb-2 h-20 w-20">
          <AvatarImage
            src={user.profileImage}
            className="rounded-[50%] border-2"
          />
          <AvatarFallback />
        </Avatar>
        <span className="font-bold">{user.fullName}</span>
        <span className="text-sm font-light text-neutral-600 dark:text-neutral-200">
          @{user.username}
        </span>{" "}
      </div>
    </>
  );
}

export default ProfileHeader;
