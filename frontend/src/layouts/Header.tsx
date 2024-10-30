import type { PropsWithChildren } from "react";

import LogoutButton from "@/features/authentication/LogoutButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import useUser from "@/hooks/useUser";

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="font-noticia text-primary-foreground text-2xl font-bold tracking-wide">
      {children}
    </h1>
  );
}

function Header() {
  const { user } = useUser();

  return (
    <header className="bg-primary flex items-center justify-between px-4 py-2 shadow-md">
      <Avatar>
        <AvatarImage src={user?.profileImage} />
        <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-2">
        <Title>Firebird</Title>
        <Logo width="2rem" />
      </div>

      <LogoutButton />
    </header>
  );
}

export default Header;
