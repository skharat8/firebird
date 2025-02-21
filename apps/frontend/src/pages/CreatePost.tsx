import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import Button from "@/components/ui/Button";
import PostEditor from "@/features/posts/PostEditor";
import useKeyPress from "@/hooks/useKeyPress";

function CreatePost() {
  const navigate = useNavigate();
  function navigateBack() {
    navigate(-1);
  }

  useKeyPress("Escape", navigateBack);

  return (
    <main className="bg-accent flex min-h-screen w-dvw flex-col p-6">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent-foreground hover:text-accent mb-3"
        onClick={navigateBack}
      >
        <X size="4rem" />
      </Button>

      <PostEditor />
    </main>
  );
}

export default CreatePost;
