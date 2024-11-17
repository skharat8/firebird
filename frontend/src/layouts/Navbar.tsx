import {
  RiUser3Line,
  RiUser3Fill,
  RiHome2Line,
  RiHome2Fill,
  RiSearchLine,
  RiSearchFill,
} from "react-icons/ri";

import NavbarItem from "@/features/navigation/NavbarItem";
import { cn } from "@/lib/utils";

type NavBarProps = {
  className: string;
};

function Navbar({ className }: NavBarProps) {
  const iconSize = "1.2rem";

  return (
    <nav className={cn("bg-card sticky shadow-sm", className)}>
      <NavbarItem
        to="/profile"
        title="Profile"
        item={<RiUser3Line size={iconSize} />}
        selectedItem={<RiUser3Fill size={iconSize} />}
      />
      <NavbarItem
        to="/"
        title="Home"
        item={<RiHome2Line size={iconSize} />}
        selectedItem={<RiHome2Fill size={iconSize} />}
      />
      <NavbarItem
        to="/search"
        title="Search"
        item={<RiSearchLine size={iconSize} />}
        selectedItem={<RiSearchFill size={iconSize} />}
      />
    </nav>
  );
}

export default Navbar;
