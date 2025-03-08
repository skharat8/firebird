import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

import PostContent from "./PostContent";
import usePost from "@/hooks/usePost";

function PostWithComments() {
  const { postId } = useParams() as { postId: string };
  const { post, isPending, isSuccess } = usePost(postId);

  return (
    <>
      {isPending && <GridLoader color="#b63b63" />}
      {isSuccess && (
        <div className="mx-auto max-w-[65ch] self-start p-5">
          <PostContent
            post={post}
            disableLineClamp
            className="border-b-3 rounded-b-none border-b-neutral-200 dark:border-b-neutral-400"
          />
          {post?.comments.map((comment) => (
            <PostContent
              key={comment.id}
              post={comment}
              className="border-t-1 rounded-none border-neutral-200 pl-6 dark:border-b-neutral-400"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default PostWithComments;
