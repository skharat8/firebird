import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { FaRetweet } from "react-icons/fa";

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

type UserPostProps = {
  post: Post;
};

function UserPost({ post }: UserPostProps) {
  const [like, toggleLike] = useToggle({ initialValue: false });
  const [retweet, toggleRetweet] = useToggle({ initialValue: false });

  return (
    <Card>
      <CardHeader className="flex-row gap-4">
        <Avatar>
          <AvatarImage src={post.author.profileImage} />
          <AvatarFallback>{post.author.fullName}</AvatarFallback>
        </Avatar>
        <h2>
          <p>{post.author.fullName}</p>
          <span className="text-sm font-light">@{post.author.username}</span>
        </h2>
      </CardHeader>

      <CardContent>
        <p>{post.content}</p>
      </CardContent>

      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

export default UserPost;
