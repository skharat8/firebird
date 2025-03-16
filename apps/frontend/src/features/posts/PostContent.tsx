import { Link } from "react-router-dom";

import { Heart, MessageCircle, Repeat } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import useRetweet from "@/features/posts/useRetweet";
import { getTimeElapsed } from "@/utils/date.utils";

import styles from "./Post.module.css";
import useLike from "./useLike";
import usePost from "./usePost";

type PostContentProps = {
  postId: string;
  hoverShadow?: boolean;
  disableLineClamp?: boolean;
  className?: string;
};

function PostContent({
  postId,
  hoverShadow,
  disableLineClamp,
  className,
}: PostContentProps) {
  const { post } = usePost(postId);
  const { like } = useLike(postId);
  const { retweet } = useRetweet(postId);

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

  const isLiked = post.likes?.length === 1;
  const isRetweeted = post.retweets?.length === 1;

  const linkStyles = "flex w-fit text-current hover:text-current";
  const dotAfter = "after:ml-1 after:content-['•']";

  function submitLike() {
    like(isLiked);
  }

  function submitRetweet() {
    retweet(isRetweeted);
  }

  return (
    <Card className={`${hoverShadow ? styles.post : ""} ${className} relative`}>
      <CardHeader className="flex-row items-center gap-4 pb-2">
        <Link to={`/profile/${post.author.id}`} className={linkStyles}>
          <Avatar>
            <AvatarImage src={post.author.profileImage} />
            <AvatarFallback>{post.author.fullName}</AvatarFallback>
          </Avatar>
        </Link>

        <Link to={`/profile/${post.author.id}`} className={linkStyles}>
          <h2>
            <p className="font-bold hover:underline">{post.author.fullName}</p>
            <span className="text-sm font-light text-neutral-600 dark:text-neutral-300">
              @{post.author.username}
            </span>
          </h2>
        </Link>
        <p className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
          {getTimeElapsed(post.createdAt)}
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <Link
          to={`/post/${post.id}`}
          className="font-light text-current hover:text-current"
        >
          <p className={disableLineClamp ? "" : "line-clamp-5"}>
            {post.content}
          </p>
        </Link>
      </CardContent>

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
            className={
              "{dotAfter} mr-3 text-sm sm:hidden dark:text-neutral-200"
            }
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
            className={
              "{dotAfter} mr-3 text-sm sm:hidden dark:text-neutral-200"
            }
          >
            {post._count.retweets}
          </span>

          <Button variant="ghost" size="icon" className="rounded-full">
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
    </Card>
  );
}

export default PostContent;
