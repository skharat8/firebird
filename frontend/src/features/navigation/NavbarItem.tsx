import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

function NavbarItem({ to, item, selectedItem }: NavbarItemProps) {
  const baseStyles = `flex flex-grow items-center justify-center py-2
  text-primary-foreground hover:text-secondary/90 hover:bg-accent-purple`;

  const inactiveStyles = cn(baseStyles, "bg-primary");
  const activeStyles = cn(baseStyles, "bg-accent-purple text-secondary/90");

  function getNavLinkStyles({ isActive }: { isActive: boolean }) {
    return isActive ? activeStyles : inactiveStyles;
  }

  return (
    <NavLink to={to} className={getNavLinkStyles}>
      {({ isActive }) => (isActive ? selectedItem : item)}
    </NavLink>
  );
}

type NavbarItemProps = {
  to: string;
  item: React.ReactElement;
  selectedItem: React.ReactElement;
};

export default NavbarItem;
