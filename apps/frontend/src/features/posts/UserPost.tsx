import type { Post } from "@/schemas/post.zod";
import PostContent from "./PostContent";

type UserPostProps = {
  post: Post;
};

function UserPost({ post }: UserPostProps) {
  return <PostContent post={post} />;
}

export default UserPost;
