import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import useUser from "@/hooks/useUser";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { Avatar } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { createPost } from "@/services/apiPost";

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "What's on your mind...",
  }),
];

function PostEditor() {
  const navigate = useNavigate();
  const { user } = useUser();

  const editor = useEditor({ extensions });
  const content = editor?.getText({ blockSeparator: "\n" }) ?? "";

  async function submitPost() {
    await createPost(content);
    navigate("/");
  }

  return (
    <>
      <div className="flex flex-1">
        <Avatar>
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>

        <EditorContent
          editor={editor}
          className="mb-4 ml-4 mr-2 flex-1 rounded-md bg-gray-200 p-3 text-neutral-900 shadow-md"
        />
      </div>
      <Button
        disabled={!content.trim()}
        className="mr-1 self-end rounded-lg font-bold"
        onClick={submitPost}
      >
        Post
      </Button>
    </>
  );
}

export default PostEditor;
