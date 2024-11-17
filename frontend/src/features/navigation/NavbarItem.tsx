import { NavLink } from "react-router-dom";
import { cn, tw } from "@/lib/utils";
import buttonVariants from "@/components/ui/buttonVariants";

function NavbarItem({ to, title, item, selectedItem }: NavbarItemProps) {
  const inactiveStyles = tw`bg-card text-primary hover:text-primary-foreground hover:bg-primary flex-1`;

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
    <NavLink to={to} className={getNavLinkStyles} title={title}>
      {({ isActive }) => (
        <>
          {isActive ? selectedItem : item}
          <span className="hidden sm:inline">{title}</span>
        </>
      )}
    </NavLink>
  );
}

type NavbarItemProps = {
  to: string;
  title: string;
  item: React.ReactElement;
  selectedItem: React.ReactElement;
};

export default NavbarItem;
