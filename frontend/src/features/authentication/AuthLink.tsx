import Button from "@/components/ui/Button";
import type { AuthType } from "@/data/types";

function AuthLink({ authType, onAuthToggle }: AuthLinkProps) {
  const linkTo = authType === "signup" ? "Login" : "Register";

  return (
    <p>
      <span className="text-sm">
        {authType === "signup" ? "Already" : "Don't"} have an account?
      </span>
      <Button variant="link" size="lg" className="px-2" onClick={onAuthToggle}>
        {linkTo}
      </Button>
    </p>
  );
}

type AuthLinkProps = {
  authType: AuthType;
  onAuthToggle: () => void;
};

export default AuthLink;
