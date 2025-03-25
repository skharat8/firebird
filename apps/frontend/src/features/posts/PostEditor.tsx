import React from "react";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Avatar } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";

const MAX_CHARACTER_COUNT = 280;

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "What's on your mind...",
  }),
  CharacterCount.configure({ limit: MAX_CHARACTER_COUNT }),
];

type PostEditorProps = {
  showAvatar?: boolean;
  onSubmit: (content: string) => void;
  isSubmitPending: boolean;
  className?: string;
};

function PostEditor({
  showAvatar = true,
  onSubmit,
  isSubmitPending,
  className,
}: PostEditorProps) {
  const { user } = useUser();

  const editor = useEditor({
    extensions,
  });
  const content = editor?.getText({ blockSeparator: "\n" }) ?? "";

  function handleSubmitPost(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(content);
  }

  return (
    <form
      onSubmit={handleSubmitPost}
      className={cn("flex h-full flex-col", className)}
    >
      {showAvatar && (
        <div className="mb-4 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
          <h2>
            <p className="font-semibold text-neutral-900 dark:text-neutral-50">
              {user?.fullName}
            </p>
            <span className="text-sm text-neutral-500 dark:text-neutral-300/90">
              @{user?.username}
            </span>
          </h2>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="bg-card-400/90 relative mb-4 h-[80%] flex-1 rounded-md p-3 text-neutral-900
          dark:bg-neutral-400"
      >
        <span className="absolute bottom-4 right-4 text-sm text-neutral-600/90">
          {MAX_CHARACTER_COUNT - (editor?.getCharacterCount() ?? 0)}
        </span>
      </EditorContent>

      <Button
        type="submit"
        disabled={!content.trim()}
        className="self-end rounded-lg font-bold"
      >
        {isSubmitPending ? <SpinnerMini /> : "Post"}
      </Button>
    </form>
  );
}

export default PostEditor;
