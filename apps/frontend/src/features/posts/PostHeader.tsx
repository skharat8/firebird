import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CardHeader } from "@/components/ui/Card";
import { postKeys } from "@/data/queryKeys";
import useUser from "@/hooks/useUser";
import { getTimeElapsed } from "@/utils/date.utils";

import useDeletePost from "./useDeletePost";
import usePost from "./usePost";

type PostHeaderProps = {
  postId: string;
  toggleIsVisible: () => void;
};

function PostHeader({ postId, toggleIsVisible }: PostHeaderProps) {
  const { user } = useUser();
  const { post } = usePost(postId);
  const { removePost } = useDeletePost();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [parentPostId, _] = React.useState(post.parentPostId);

  const trashIconColor = "hsl(41 18% 48%)";
  const linkStyles = "flex w-fit text-current hover:text-current";

  function handleTrash() {
    toggleIsVisible();
    removePost(postId, {
      onSuccess: () => {
        if (parentPostId) {
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: postKeys.detail(parentPostId),
            });
          }, 1000);
        } else if (pathname.includes("post")) {
          navigate(-1);
        }
      },
    });
  }

  return (
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
          <span className="text-sm text-neutral-500/90 dark:text-neutral-300/90">
            @{post.author.username}
          </span>
        </h2>
      </Link>
      <p className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
        {getTimeElapsed(post.createdAt)}
      </p>

      {post.author.id === user?.id && (
        <Button
          variant="ghost"
          size="icon"
          className="-ml-3 -mr-4 -mt-2 rounded-full"
          onClick={handleTrash}
        >
          <Trash2 color={trashIconColor} />
        </Button>
      )}
    </CardHeader>
  );
}

export default PostHeader;
