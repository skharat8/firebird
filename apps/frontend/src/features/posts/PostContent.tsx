import { Heart, MessageCircle, Repeat } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import type { Post, PostWithComments } from "@/schemas/post.zod";
import useToggle from "@/hooks/useToggle";
import { Link } from "react-router-dom";

type PostContentProps = {
  post: Post | PostWithComments;
};

function PostContent({ post }: PostContentProps) {
  const [like, toggleLike] = useToggle({ initialValue: false });
  const [retweet, toggleRetweet] = useToggle({ initialValue: false });

  const linkStyles = "flex w-fit gap-4 text-current hover:text-current";
  const dotAfter = "after:ml-1 after:content-['•']";

  return (
    <div className="grid">
      <Link to={`/profile/${post.author.id}`} className={linkStyles}>
        <Avatar>
          <AvatarImage src={post.author.profileImage} />
          <AvatarFallback>{post.author.fullName}</AvatarFallback>
        </Avatar>
      </Link>

      <Link to={`/profile/${post.author.id}`} className={linkStyles}>
        <h2>
          <p className="font-bold hover:underline">{post.author.fullName}</p>
          <span className="text-sm font-light">@{post.author.username}</span>
        </h2>
      </Link>

      <Link
        to={`/post/${post.id}`}
        className="font-light text-current hover:text-current"
      >
        <p>{post.content}</p>
      </Link>

      <footer className="flex items-center">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleLike}
          >
            {like ? <Heart color="red" fill="red" /> : <Heart />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleRetweet}
          >
            {retweet ? <Repeat color="green" fill="green" /> : <Repeat />}
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
      </footer>
    </div>
  );
}

export default PostContent;
