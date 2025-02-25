import Button from "@/components/ui/Button";
import type { AuthType } from "@/data/types";

type AuthLinkProps = {
  authType: AuthType;
  onAuthToggle: () => void;
};

function AuthLink({ authType, onAuthToggle }: AuthLinkProps) {
  const linkTo = authType === "signup" ? "Login" : "Register";

  return (
    <p>
      <span className="text-sm text-neutral-800 dark:text-neutral-100">
        {authType === "signup" ? "Already" : "Don't"} have an account?
      </span>
      <Button variant="link" size="lg" className="px-2" onClick={onAuthToggle}>
        {linkTo}
      </Button>
    </p>
  );
}

export default AuthLink;
