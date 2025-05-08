import type { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import LogoutButton from "@/features/authentication/LogoutButton";
import useUser from "@/hooks/useUser";

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="dark:text-primary text-card text-3xl font-bold tracking-wide">
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
    <header className="bg-primary dark:bg-card sticky top-0 z-10 w-full shadow-sm">
      <div className="mx-auto flex max-w-4xl items-center px-3 py-3">
        {showAvatar && (
          <Link to={`/profile`}>
            <Avatar className="shadow-[inset_0_0_0_1px_hsla(0,0%,0%,.1)]">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        {showBackButton && (
          <ArrowLeft
            className="text-card dark:text-primary mr-4 cursor-pointer"
            onClick={navigateBack}
          />
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
