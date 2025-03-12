import React from "react";
import { GridLoader } from "react-spinners";
import { useIntersectionObserver } from "usehooks-ts";

import PostContent from "../posts/PostContent";
import Offline from "@/components/ui/Offline";
import ProfileHeader from "./ProfileHeader";
import useProfileFeed from "./useProfileFeed";
import SpinnerMini from "@/components/ui/SpinnerMini";

function ProfileFeed({ userId }: { userId: string }) {
  const { data, isPending, isPaused, fetchNextPage } = useProfileFeed(userId);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  React.useEffect(() => {
    if (isIntersecting) fetchNextPage();
  });

  // TODO: getting posts and user data needs to be separated out on the backend
  return (
    <div className="flex flex-col items-center gap-5">
      {isPending && (isPaused ? <Offline /> : <GridLoader color="#b63b63" />)}
      {data && (
        <>
          <div className="mx-auto flex max-w-[65ch] flex-col gap-2">
            <ProfileHeader user={data.pages.at(0)?.user} />
            {data.pages.map((page) =>
              page.posts.map((post) => (
                <PostContent
                  key={post.id}
                  post={post}
                  hoverShadow={true}
                  className="rounded-none"
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
