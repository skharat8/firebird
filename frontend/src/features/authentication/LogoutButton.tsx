import { RiLogoutBoxRLine } from "react-icons/ri";

import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import useLogout from "./useLogout";

function LogoutButton() {
  const { logout, isLogoutPending } = useLogout();

  return (
    <Button
      size="icon"
      variant="secondary"
      className="bg-popover text-primary hover:bg-secondary-foreground/60
        hover:text-primary-foreground"
      // NO_LINT
      // @ts-expect-error Mutation function not expected to fit any handler definition
      onClick={logout}
      disabled={isLogoutPending}
    >
      {isLogoutPending ? <SpinnerMini /> : <RiLogoutBoxRLine />}
    </Button>
  );
}

export default LogoutButton;
