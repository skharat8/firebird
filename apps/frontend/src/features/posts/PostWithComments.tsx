import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

import Offline from "@/components/ui/Offline";
import SpinnerMini from "@/components/ui/SpinnerMini";
import usePost from "@/features/posts/usePost";

import EmptyComments from "./EmptyComments";
import PostContent from "./PostContent";

function PostWithComments() {
  const { postId } = useParams() as { postId: string };
  const { post, isPending, isPaused } = usePost(postId, true);

  const commentsSpinner = isPaused ? (
    <Offline />
  ) : (
    <div className="mx-auto mt-4">
      <SpinnerMini />
    </div>
  );

  return (
    <>
      {isPending && (isPaused ? <Offline /> : <GridLoader color="#b63b63" />)}

      {post && (
        <div className="mx-auto max-w-[65ch] self-start p-5">
          <PostContent
            key={post.id}
            postId={post.id}
            disableLineClamp
            className="border-b-3 rounded-b-none border-b-neutral-200 dark:border-b-neutral-800"
          />
          {!post?.comments ? (
            commentsSpinner
          ) : post.comments.length === 0 ? (
            <EmptyComments />
          ) : (
            post.comments.map((comment) => (
              <PostContent
                key={comment.id}
                postId={comment.id}
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
