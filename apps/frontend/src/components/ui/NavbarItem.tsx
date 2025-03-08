import { NavLink } from "react-router-dom";
import { cn, tw } from "@/lib/utils";
import buttonVariants from "@/components/ui/buttonVariants";

type NavbarItemProps = {
  to: string;
  title: string;
  icon: React.ReactElement;
  selectedIcon: React.ReactElement;
};

function NavbarItem({ to, title, icon, selectedIcon }: NavbarItemProps) {
  const inactiveStyles = tw`bg-card text-foreground hover:text-primary-foreground hover:bg-primary flex-1
  sm:justify-start`;

  const activeStyles = cn(
    inactiveStyles,
    "bg-primary text-primary-foreground font-bold",
  );

  function getNavLinkStyles({ isActive }: { isActive: boolean }) {
    const buttonStyles = buttonVariants({ variant: "ghost" });
    const extraStyles = isActive ? activeStyles : inactiveStyles;

    return cn(buttonStyles, extraStyles);
  }

  return (
    <NavLink to={to} end className={getNavLinkStyles} title={title}>
      {({ isActive }) => (
        <>
          {isActive ? selectedIcon : icon}
          <span className="hidden lg:inline">{title}</span>
        </>
      )}
    </NavLink>
  );
}

export default NavbarItem;
