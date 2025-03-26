import type React from "react";
import type { ComponentProps, PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import type { LucideProps } from "lucide-react";

type FollowButtonProps = ComponentProps<"button"> & {
  icon: React.ComponentType<LucideProps>;
  variant?: "primary" | "ghost";
  className?: string;
};

const buttonVariants = cva(
  `border-3 border-accent-cyan-900 group flex items-center justify-center gap-4
  rounded-xl py-1 pl-1 pr-4`,
  {
    variants: {
      variant: {
        primary: "bg-accent-cyan-900",
        ghost: "bg-stone-800",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const iconVariants = cva("border-1 rounded-[11px] p-2", {
  variants: {
    variant: {
      primary:
        "bg-accent-cyan-600 border-accent-cyan-900 group-hover:bg-[hsl(184_72_38)]",
      ghost: "bg-stone-800",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function FollowButton({
  icon: Icon,
  variant,
  className,
  children,
  ...rest
}: PropsWithChildren<FollowButtonProps>) {
  return (
    <button className={buttonVariants({ variant, className })} {...rest}>
      <span className={iconVariants({ variant })}>
        <Icon size={18} strokeWidth={3} />
      </span>
      <span className="font-bold text-neutral-100">{children}</span>
    </button>
  );
}

export default FollowButton;
