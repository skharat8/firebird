import React from "react";
import { GridLoader } from "react-spinners";

import { useIntersectionObserver, useLocalStorage } from "usehooks-ts";

import Offline from "@/components/ui/Offline";
import SpinnerMini from "@/components/ui/SpinnerMini";

import PostContent from "../posts/PostContent";
import useProfileFeed from "../posts/useProfileFeed";
import ProfileHeader from "./ProfileHeader";

function ProfileFeed({ userId }: { userId: string }) {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useProfileFeed(userId);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
  const [scrollPosition, setScrollPosition] = useLocalStorage("profileScroll", {
    top: 0,
    left: 0,
  });

  React.useEffect(() => {
    if (isIntersecting) fetchNextPage();
  });

  // Save scroll position
  React.useEffect(() => {
    return () =>
      setScrollPosition({ top: window.scrollY, left: window.scrollX });
  }, [setScrollPosition]);

  // Restore scroll position
  React.useEffect(() => {
    window.scrollTo(scrollPosition);
  }, [scrollPosition]);

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

          <div ref={ref} className="m-auto border-2 border-transparent">
            {isFetchingNextPage && <SpinnerMini />}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileFeed;
