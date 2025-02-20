import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { getPost } from "@/services/apiPost";
// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";
import PostContent from "./PostContent";

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
        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow">
          <PostContent post={post} />
          {post.comments.map((comment) => (
            <PostContent key={comment.id} post={comment} />
          ))}
        </div>
      )}
    </>
  );
}

export default UserPostWithComments;
