import { Heart, MessageCircle, Repeat } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import type { Post, PostWithComments } from "@/schemas/post.zod";
import useToggle from "@/hooks/useToggle";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { getTimeElapsed } from "@/utils/date.utils";
import usePostAction from "@/features/posts/usePostAction";

import styles from "./Post.module.css";
import PostAction from "@/data/enums";
import useUser from "@/hooks/useUser";

type PostContentProps = {
  post: Post | PostWithComments;
  hoverShadow?: boolean;
  disableLineClamp?: boolean;
  className?: string;
};

function PostContent({
  post,
  hoverShadow,
  disableLineClamp,
  className,
}: PostContentProps) {
  const [like, toggleLike] = useToggle({
    initialValue: post?.likes?.length === 1 ? true : false,
  });
  const [retweet, toggleRetweet] = useToggle({
    initialValue: post?.retweets?.length === 1 ? true : false,
  });
  const { performPostAction } = usePostAction(post.id);

  const linkStyles = "flex w-fit text-current hover:text-current";
  const dotAfter = "after:ml-1 after:content-['•']";

  function submitLike() {
    toggleLike();
    performPostAction(PostAction.LIKE);
  }

  function submitRetweet() {
    toggleRetweet();
    performPostAction(PostAction.RETWEET);
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

      <CardContent className="pb-4">
        <Link
          to={`/post/${post.id}`}
          className="font-light text-current hover:text-current"
        >
          <p className={disableLineClamp ? "" : "line-clamp-5"}>
            {post.content}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="flex items-center py-2">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={submitLike}
          >
            {post?.likes?.length === 1 ? (
              <Heart color="red" fill="red" />
            ) : (
              <Heart />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={submitRetweet}
          >
            {post?.retweets?.length === 1 ? (
              <Repeat color="green" fill="green" />
            ) : (
              <Repeat />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircle />
          </Button>
        </div>

        <div className="ml-auto flex gap-1 text-sm">
          <span className={dotAfter}>{post._count.likes} Likes</span>
          <span className={dotAfter}>{post._count.retweets} Shares</span>
          <span>{post._count.comments} Comments</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostContent;
