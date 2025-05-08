import { cva } from "class-variance-authority";

import styles from "./Button.module.css";

const buttonVariants = cva(
  `focus-visible:ring-ring inline-flex items-center justify-center gap-2
  whitespace-nowrap rounded-md text-sm font-medium transition-colors
  focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none
  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: `border-input bg-background hover:bg-accent hover:text-accent-foreground border
        shadow-sm`,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        demo: `text-primary bg-primary-900 border-primary-50 border-2 font-bold
        transition-[border_1s_ease] hover:border-solid ${styles.btnGuestDemo}
        dark:bg-primary-900 dark:text-primary-100 dark:border-neutral-800 dark:shadow-xl
        dark:hover:border-neutral-200`,
        ghost: `dark:hover:bg-accent hover:bg-card-500 hover:text-accent-foreground
        hover:ring-primary hover:shadow`,
        smallCaps: styles.btnSmallCaps,
        navbar: `bg-primary dark:bg-card text-card dark:text-primary hover:bg-card
        dark:hover:bg-primary hover:text-primary dark:hover:text-card border-none
        shadow-none`,
        link: "text-primary-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        rounded: "h-14 w-14 rounded-full",
      },
      iconSize: {
        default: "[&_svg]:size-5",
        sm: "[&_svg]:size-4",
        lg: "[&_svg]:size-6",
        xl: "[&_svg]:size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconSize: "default",
    },
  },
);

export default buttonVariants;
