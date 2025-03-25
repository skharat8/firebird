import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/Card";
import useToggle from "@/hooks/useToggle";

import CreateComment from "./CreateComment";
import styles from "./Post.module.css";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [showCommentBox, toggleShowCommentBox] = useToggle({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    initialValue: location?.state?.showCommentForId === postId,
  });

  // Clear the location state after using it once
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (location?.state?.showCommentForId === postId) {
      navigate(location.pathname, {
        replace: true,
        state: { showCommentForId: null },
      });
    }
  }, [navigate, location, postId]);

  const cardStyles = `${hoverShadow ? styles.post : ""} ${className} relative`;

  return (
    <>
      <Card className={cardStyles}>
        <PostHeader postId={postId} />

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

        <PostFooter
          postId={postId}
          toggleShowCommentBox={toggleShowCommentBox}
        />
      </Card>

      {showCommentBox && (
        <CreateComment
          parentPostId={postId}
          toggleShowCommentBox={toggleShowCommentBox}
        />
      )}
    </>
  );
}

export default PostContent;
