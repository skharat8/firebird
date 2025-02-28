import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { getPost } from "@/services/apiPost";
// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";
import PostContent from "./PostContent";
import Header from "@/layouts/Header";

function UserPostWithComments() {
  const { postId } = useParams() as { postId: string };
  const {
    data: post,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({ queryKey: ["post", postId], queryFn: () => getPost(postId) });

  if (isError) {
    return <ErrorPage customError={error} />;
  }

  return (
    <>
      {isPending && <BeatLoader color="#b63b63" />}
      {isSuccess && (
        <div className="dark:bg-secondary-50/60 w-full">
          <Header showBackButton={true} />
          <div className="mx-auto max-w-[65ch] p-5">
            <PostContent
              post={post}
              className="border-b-3 rounded-b-none border-b-neutral-200 dark:border-b-neutral-400"
            />
            {post.comments.map((comment) => (
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

export default UserPostWithComments;
