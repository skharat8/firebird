import { LogOut } from "lucide-react";

import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";

import useLogout from "./useLogout";

function LogoutButton() {
  const { logout, isLogoutPending } = useLogout();

  return (
    <Button
      size="icon"
      variant="navbar"
      // @ts-expect-error Mutation function not expected to fit any handler definition
      onClick={logout}
      disabled={isLogoutPending}
    >
      {isLogoutPending ? <SpinnerMini /> : <LogOut />}
      <span className="sr-only">Log out</span>
    </Button>
  );
}

export default LogoutButton;
