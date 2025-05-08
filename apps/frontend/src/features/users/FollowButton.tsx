import type { ComponentProps, PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";

import useToggle from "@/hooks/useToggle";

type FollowButtonProps = ComponentProps<"button"> & {
  initialIsFollowing: boolean;
  onFollow: (isFollowing: boolean) => void;
  className?: string;
};

const buttonVariants = cva(
  "border-3 group flex items-center justify-center rounded-xl pl-1 pr-4",
  {
    variants: {
      variant: {
        primary: "bg-accent-cyan-900 border-accent-cyan-900 gap-2",
        ghost: "gap-1 border-stone-800 bg-stone-800",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const iconVariants = cva("rounded-[11px] p-2", {
  variants: {
    variant: {
      primary:
        "bg-accent-cyan-600 border-accent-cyan-900 group-hover:bg-[hsl(184_72_38)]",
      ghost: "text-stone-200 dark:bg-stone-800",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function FollowButton({
  initialIsFollowing,
  onFollow,
  className,
  children,
  ...rest
}: PropsWithChildren<FollowButtonProps>) {
  const [isFollowing, toggleFollowing] = useToggle({
    initialValue: initialIsFollowing,
  });
  const variant = isFollowing ? "primary" : "ghost";
  const Icon = isFollowing ? UserRoundCheck : UserRoundPlus;

  return (
    <button
      className={buttonVariants({ variant, className })}
      {...rest}
      onClick={() => {
        onFollow(isFollowing);
        toggleFollowing();
      }}
    >
      <span className={iconVariants({ variant })}>
        <Icon size={18} strokeWidth={3} />
      </span>
      <span className="font-bold text-neutral-100">
        {isFollowing ? "Following" : "Follow"}
      </span>
    </button>
  );
}

export default FollowButton;
