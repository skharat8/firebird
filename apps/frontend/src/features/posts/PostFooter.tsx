import { useLocation, useNavigate } from "react-router-dom";

import { Heart, MessageCircle, Repeat } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { useTheme } from "@/components/ThemeProvider";
import Button from "@/components/ui/Button";
import { CardFooter } from "@/components/ui/Card";

import useLike from "./useLike";
import usePost from "./usePost";
import useRetweet from "./useRetweet";

type PostFooterProps = {
  postId: string;
  toggleShowCommentBox: () => void;
};

function PostFooter({ postId, toggleShowCommentBox }: PostFooterProps) {
  const { post } = usePost(postId);
  const { like } = useLike(postId);
  const { retweet } = useRetweet(postId);
  const navigate = useNavigate();
  const location = useLocation();
  const idFromPath = location.pathname.split("/").at(-1);

  const isLiked = post.likes?.length === 1;
  const isRetweeted = post.retweets?.length === 1;

  const themeContext = useTheme(); // check app theme
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)"); // check system theme

  let iconColor;
  if (themeContext.theme === "dark") {
    iconColor = "hsl(40 15% 90%)";
  } else if (themeContext.theme === "light") {
    iconColor = "black";
  } else {
    // If app theme is set to system, check the system theme
    iconColor = isDarkTheme ? "hsl(40 15% 90%)" : "black";
  }

  function submitLike() {
    like(isLiked);
  }

  function submitRetweet() {
    retweet(isRetweeted);
  }

  function handleAddComment() {
    if (idFromPath !== postId) {
      navigate(`/post/${postId}`, { state: { showCommentForId: postId } });
    } else {
      toggleShowCommentBox();
    }
  }

  const dotAfter = "after:ml-1 after:content-['•']";

  return (
    <CardFooter className="rounded-lg rounded-t-none pb-2 pl-4">
      <div className="flex items-center sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={submitLike}
        >
          {isLiked ? (
            <Heart color="red" fill="red" />
          ) : (
            <Heart color={iconColor} />
          )}
        </Button>
        <span
          className={"{dotAfter} mr-3 text-sm sm:hidden dark:text-neutral-200"}
        >
          {post._count.likes}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={submitRetweet}
        >
          {isRetweeted ? (
            <Repeat color="green" fill="green" />
          ) : (
            <Repeat color={iconColor} />
          )}
        </Button>
        <span
          className={"{dotAfter} mr-3 text-sm sm:hidden dark:text-neutral-200"}
        >
          {post._count.retweets}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleAddComment}
        >
          <MessageCircle color={iconColor} />
        </Button>
        <span className="text-sm sm:hidden dark:text-neutral-200">
          {post._count.comments}
        </span>
      </div>

      <div className="ml-auto hidden gap-1 text-sm sm:flex">
        <span className={dotAfter}>{post._count.likes} Likes</span>
        <span className={dotAfter}>{post._count.retweets} Shares</span>
        <span>{post._count.comments} Comments</span>
      </div>
    </CardFooter>
  );
}

export default PostFooter;
