import React from "react";
import { GridLoader } from "react-spinners";

import { useIntersectionObserver } from "usehooks-ts";

import Offline from "@/components/ui/Offline";
import SpinnerMini from "@/components/ui/SpinnerMini";

import PostContent from "../posts/PostContent";
import useProfileFeed from "../posts/useProfileFeed";
import ProfileHeader from "./ProfileHeader";

function ProfileFeed({ userId }: { userId: string }) {
  const { data, isPending, isPaused, fetchNextPage } = useProfileFeed(userId);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  React.useEffect(() => {
    if (isIntersecting) fetchNextPage();
  });

  // TODO: getting posts and user data needs to be separated out on the backend
  return (
    <div className="flex flex-col items-center gap-5">
      {isPending &&
        (isPaused ? <Offline /> : <GridLoader color="var(--color-primary)" />)}
      {data && (
        <>
          <div className="mx-auto flex max-w-[65ch] flex-col">
            <ProfileHeader user={data.pages.at(0)!.user} />
            {data.pages.map((page) =>
              page.posts.map((post) => (
                <PostContent
                  key={post.id}
                  postId={post.id}
                  hoverShadow={true}
                  className="mx-4 my-2"
                />
              )),
            )}
          </div>

          <div ref={ref} className="m-auto flex-1">
            <SpinnerMini />
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileFeed;
