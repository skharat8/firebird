import React from "react";
import { GridLoader } from "react-spinners";

import PostContent from "@/features/posts/PostContent";
import PostEditor from "@/features/posts/PostEditor";
import Offline from "@/components/ui/Offline";
import useUserFeed from "@/hooks/useUserFeed";
import { useIntersectionObserver } from "usehooks-ts";
import SpinnerMini from "@/components/ui/SpinnerMini";

function Home() {
  const { data, isPending, isPaused, fetchNextPage, isFetchingNextPage } =
    useUserFeed();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  React.useEffect(() => {
    if (isIntersecting) fetchNextPage();
  });

  return (
    <div className="flex flex-col items-stretch gap-5 p-5">
      {isPending && (isPaused ? <Offline /> : <GridLoader color="#b63b63" />)}
      {data && (
        <>
          <PostEditor showAvatar={false} className="hidden md:flex" />
          {data.pages.map((page) =>
            page.posts.map((post) => (
              <PostContent key={post.id} post={post} hoverShadow={true} />
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
