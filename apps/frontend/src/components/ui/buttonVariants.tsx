import { cva } from "class-variance-authority";
import styles from "./Button.module.css";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        demo: `text-primary font-bold border-10 bg-secondary/80 ${styles.btnGuestDemo}`,
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:ring-primary hover:shadow",
        smallCaps: styles.btnSmallCaps,
        navbar:
          "bg-card hover:bg-primary hover:text-primary-foreground border-none shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        rounded: "h-14 w-14 rounded-full",
      },
      iconSize: {
        default: "[&_svg]:size-4",
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
