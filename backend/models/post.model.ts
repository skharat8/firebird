import mongoose, { Schema } from "mongoose";
import type { DbUser } from "../schemas/user.zod";

type Post = {
  author: DbUser["id"];
  content: string;
  image?: string;
  likes?: DbUser["id"][];
  retweets?: DbUser["id"][];
  comments?: Post[];
  createdAt: Date;
  updatedAt: Date;
};

const postSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true },
);

const PostModel = mongoose.model<Post>("Post", postSchema);

export type { Post };
export default PostModel;
