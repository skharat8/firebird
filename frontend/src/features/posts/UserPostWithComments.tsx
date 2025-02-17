import { Link, useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/services/apiPost";
import { BeatLoader } from "react-spinners";
import Button from "@/components/ui/Button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { FaRetweet } from "react-icons/fa";
import useToggle from "@/hooks/useToggle";
// eslint-disable-next-line import/no-restricted-paths
import ErrorPage from "@/pages/ErrorPage";

function UserPostWithComments() {
  const [like, toggleLike] = useToggle({ initialValue: false });
  const [retweet, toggleRetweet] = useToggle({ initialValue: false });

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
    <div className="flex flex-col items-stretch gap-5">
      {isPending && <BeatLoader color="#b63b63" />}
      {isSuccess && (
        <>
          <Link
            to={`/profile/${post.author.id}`}
            className="text-current hover:text-current hover:underline"
          >
            <Avatar>
              <AvatarImage src={post.author.profileImage} />
              <AvatarFallback>{post.author.fullName}</AvatarFallback>
            </Avatar>
            <h2>
              <p>{post.author.fullName}</p>
              <span className="text-sm font-light">
                @{post.author.username}
              </span>
            </h2>
          </Link>

          <p>{post.content}</p>

          <div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleLike}
            >
              {like ? <HeartFilledIcon color="red" /> : <HeartIcon />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleRetweet}
            >
              {retweet ? <FaRetweet color="green" /> : <FaRetweet />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserPostWithComments;
