import type { PropsWithChildren } from "react";

import LogoutButton from "@/features/authentication/LogoutButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import useUser from "@/hooks/useUser";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-primary text-3xl font-bold tracking-wide">
      {children}
    </h1>
  );
}

function Header() {
  const { user } = useUser();

  return (
    <header className="bg-card sticky top-0 z-10 min-w-full max-w-7xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-3">
        <Avatar className="mr-auto shadow-sm">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Link to="/">
            <Title>firebird</Title>
          </Link>
          <Logo width="2.1rem" />
        </div>
        <div className="ml-auto flex gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
