import React from "react";
import { GridLoader } from "react-spinners";

import { useIntersectionObserver, useLocalStorage } from "usehooks-ts";

import Offline from "@/components/ui/Offline";
import SpinnerMini from "@/components/ui/SpinnerMini";
import CreatePost from "@/features/posts/CreatePost";
import PostContent from "@/features/posts/PostContent";
import useHomeFeed from "@/features/posts/useHomeFeed";

function Home() {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useHomeFeed();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
  const [scrollPosition, setScrollPosition] = useLocalStorage("homeScroll", {
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

  return (
    <div className="flex flex-col items-stretch gap-4 p-4">
      {isPending &&
        (isPaused ? <Offline /> : <GridLoader color="var(--color-primary)" />)}
      {data && (
        <>
          <CreatePost />
          {data.pages.map((page) =>
            page.posts.map((post) => (
              <PostContent key={post.id} postId={post.id} hoverShadow={true} />
            )),
          )}

          <div ref={ref} className="m-auto">
            {isFetchingNextPage && <SpinnerMini />}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
