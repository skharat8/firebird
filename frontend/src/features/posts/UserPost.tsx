import { Heart, Repeat } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import type { Post } from "@/schemas/post.zod";
import useToggle from "@/hooks/useToggle";
import { Link } from "react-router-dom";

type UserPostProps = {
  post: Post;
};

function UserPost({ post }: UserPostProps) {
  const [like, toggleLike] = useToggle({ initialValue: false });
  const [retweet, toggleRetweet] = useToggle({ initialValue: false });

  return (
    <Card>
      <CardHeader>
        <Link
          to={`/profile/${post.author.id}`}
          className="flex w-fit gap-4 text-current hover:text-current"
        >
          <Avatar>
            <AvatarImage src={post.author.profileImage} />
            <AvatarFallback>{post.author.fullName}</AvatarFallback>
          </Avatar>
          <h2>
            <p className="hover:underline">{post.author.fullName}</p>
            <span className="text-xs font-light">@{post.author.username}</span>
          </h2>
        </Link>
      </CardHeader>

      <CardContent>
        <Link
          to={`/post/${post.id}`}
          className="text-current hover:text-current"
        >
          <p>{post.content}</p>
        </Link>
      </CardContent>

      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

export default UserPost;
