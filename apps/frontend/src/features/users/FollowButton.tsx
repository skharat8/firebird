import type { PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import { type HTMLMotionProps, motion } from "motion/react";

import useAppTheme from "@/hooks/useAppTheme";
import useToggle from "@/hooks/useToggle";

type FollowButtonProps = HTMLMotionProps<"button"> & {
  initialIsFollowing: boolean;
  onFollow: (isFollowing: boolean) => void;
  className?: string;
};

const buttonVariants = cva(
  "group flex items-center justify-center rounded-xl border-0 py-1 pl-1 pr-4",
  {
    variants: {
      variant: {
        primary: "bg-accent-cyan-900 border-accent-cyan-900 gap-2 pl-2",
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
      primary: `bg-accent-cyan-500 dark:bg-accent-cyan-700 border-accent-cyan-900
      group-hover:bg-[hsl(184_72_38)]`,
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
  const ghostColor = useAppTheme({
    lightModeVariable: "var(--color-stone-700)",
    darkModeVariable: "var(--color-stone-800)",
  });
  const primaryButtonColor = useAppTheme({
    lightModeVariable: "var(--color-accent-cyan-600)",
    darkModeVariable: "var(--color-accent-cyan-800)",
  });

  const motionVariants = {
    initial: {
      background: `linear-gradient(to right, ${ghostColor}, var(--color-stone-800))`,
    },
    clicked: {
      background: `linear-gradient(to right, ${primaryButtonColor}, var(--color-accent-cyan-900))`,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.button
      layout={true}
      variants={motionVariants}
      animate={isFollowing ? "clicked" : "initial"}
      className={buttonVariants({ variant, className })}
      {...rest}
      onClick={() => {
        onFollow(isFollowing);
        toggleFollowing();
      }}
    >
      <motion.span layout="position" className={iconVariants({ variant })}>
        <Icon size={18} strokeWidth={3} />
      </motion.span>
      <motion.span layout="position" className="font-bold text-neutral-100">
        {isFollowing ? "Following" : "Follow"}
      </motion.span>
    </motion.button>
  );
}

export default FollowButton;
