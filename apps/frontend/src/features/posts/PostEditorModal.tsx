import React from "react";

import Modal from "@/components/ui/Modal";

import PostEditor from "./PostEditor";
import useCreatePost from "./useCreatePost";

function PostEditorModal() {
  const [open, setOpen] = React.useState(false);
  const { createNewPost, isPending } = useCreatePost();

  function submitPost(content: string) {
    createNewPost(content, { onSuccess: () => setOpen(false) });
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <PostEditor onSubmit={submitPost} isSubmitPending={isPending} />
    </Modal>
  );
}

export default PostEditorModal;
