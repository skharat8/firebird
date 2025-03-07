import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";
import PostContent from "./PostContent";
import Header from "@/layouts/Header";
import usePost from "@/hooks/usePost";

function PostWithComments() {
  const { postId } = useParams() as { postId: string };
  const { post, isPending, isSuccess, isError, error } = usePost(postId);

  if (isError) {
    return <ErrorPage customError={error} />;
  }

  return (
    <>
      {isPending && <GridLoader color="#b63b63" />}
      {isSuccess && (
        <div className="dark:bg-secondary-50/60 w-full">
          <Header showBackButton={true} />
          <div className="mx-auto max-w-[65ch] p-5">
            <PostContent
              // @ts-expect-error
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
        </div>
      )}
    </>
  );
}

export default PostWithComments;
