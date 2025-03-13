import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

import PostContent from "./PostContent";
import usePost from "@/features/posts/usePost";
import Offline from "@/components/ui/Offline";
import EmptyComments from "./EmptyComments";

function PostWithComments() {
  const { postId } = useParams() as { postId: string };
  const { post, isPending, isPaused } = usePost(postId);

  return (
    <>
      {isPending && (isPaused ? <Offline /> : <GridLoader color="#b63b63" />)}
      {post && (
        <div className="mx-auto max-w-[65ch] self-start p-5">
          <PostContent
            post={post}
            disableLineClamp
            className="border-b-3 rounded-b-none border-b-neutral-200 dark:border-b-neutral-800"
          />
          {post.comments.length === 0 ? (
            <EmptyComments />
          ) : (
            post.comments.map((comment) => (
              <PostContent
                key={comment.id}
                post={comment}
                className="border-t-1 rounded-none border-b-neutral-200 pl-6 last-of-type:rounded-b-xl
                  dark:border-b-neutral-800"
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default PostWithComments;
