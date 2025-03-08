import type { PropsWithChildren } from "react";

import LogoutButton from "@/features/authentication/LogoutButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import useUser from "@/hooks/useUser";
import ThemeToggle from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-primary text-3xl font-bold tracking-wide">
      {children}
    </h1>
  );
}

type HeaderProps = {
  showAvatar?: boolean;
  showBackButton?: boolean;
};

function Header({ showAvatar = false, showBackButton = false }: HeaderProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  return (
    <header className="bg-card sticky top-0 z-10 min-w-full max-w-7xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-3">
        {showAvatar && (
          <Avatar className="shadow-sm">
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</AvatarFallback>
          </Avatar>
        )}
        {showBackButton && (
          <ArrowLeft className="mr-4 cursor-pointer" onClick={navigateBack} />
        )}
        <div className="my-[0.15rem] ml-auto flex gap-2">
          <Logo />
          <Link to="/">
            <Title>firebird</Title>
          </Link>
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
