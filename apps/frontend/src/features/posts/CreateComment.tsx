import styles from "./Post.module.css";
import PostEditor from "./PostEditor";
import useCreateComment from "./useCreateComment";

type CreateCommentProps = {
  parentPostId: string;
  toggleShowCommentBox: () => void;
};

function CreateComment({
  parentPostId,
  toggleShowCommentBox,
}: CreateCommentProps) {
  const { createNewComment, isPending } = useCreateComment(parentPostId);

  function submitPost(content: string) {
    createNewComment(content);
    toggleShowCommentBox();
  }

  return (
    <div
      className={`${styles.post} bg-stone-300 py-8 pl-12 pr-4 dark:m-[0.05rem] dark:bg-stone-600`}
    >
      <PostEditor onSubmit={submitPost} isSubmitPending={isPending} />
    </div>
  );
}

export default CreateComment;
