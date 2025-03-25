import PostEditor from "./PostEditor";
import useCreatePost from "./useCreatePost";

function CreatePost() {
  const { createNewPost, isPending } = useCreatePost();

  function submitPost(content: string) {
    createNewPost(content, { onSuccess: () => console.log("success") });
  }

  return (
    <PostEditor
      className="hidden md:flex"
      onSubmit={submitPost}
      isSubmitPending={isPending}
      showAvatar={false}
    />
  );
}

export default CreatePost;
