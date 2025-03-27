import { Home, TrendingUp, User } from "lucide-react";

import NavbarItem from "@/components/ui/NavbarItem";
import { cn } from "@/lib/utils";

type NavBarProps = {
  className: string;
};

function Navbar({ className }: NavBarProps) {
  return (
    <nav className={cn("bg-card sticky shadow-sm", className)}>
      <NavbarItem
        to="/profile"
        title="Profile"
        icon={<User />}
        selectedIcon={<User fill="white" />}
      />
      <NavbarItem
        to="/"
        title="Home"
        icon={<Home />}
        selectedIcon={<Home fill="white" />}
      />
      <NavbarItem
        to="/trending"
        title="Trending"
        icon={<TrendingUp />}
        selectedIcon={<TrendingUp fill="white" />}
      />
    </nav>
  );
}

export default Navbar;
