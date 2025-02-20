import type { Post } from "@/schemas/post.zod";
import PostContent from "./PostContent";

type UserPostProps = {
  post: Post;
};

function UserPost({ post }: UserPostProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow">
      <PostContent post={post} />
    </div>
  );
}

// return (
//   <Card>
//     <CardHeader>
//       <Link
//         to={`/profile/${post.author.id}`}
//         className="flex w-fit gap-4 text-current hover:text-current"
//       >
//         <Avatar>
//           <AvatarImage src={post.author.profileImage} />
//           <AvatarFallback>{post.author.fullName}</AvatarFallback>
//         </Avatar>
//         <h2>
//           <p className="hover:underline">{post.author.fullName}</p>
//           <span className="text-xs font-light">@{post.author.username}</span>
//         </h2>
//       </Link>
//     </CardHeader>

//     <CardContent>
//       <Link
//         to={`/post/${post.id}`}
//         className="text-current hover:text-current"
//       >
//         <p>{post.content}</p>
//       </Link>
//     </CardContent>

//     <CardFooter>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="rounded-full"
//         onClick={toggleLike}
//       >
//         {like ? <Heart color="red" fill="red" /> : <Heart />}
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="rounded-full"
//         onClick={toggleRetweet}
//       >
//         {retweet ? <Repeat color="green" fill="green" /> : <Repeat />}
//       </Button>
//     </CardFooter>
//   </Card>
// );

export default UserPost;
