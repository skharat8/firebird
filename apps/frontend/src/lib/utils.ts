import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This is needed to make Prettier plugins for Tailwind work with template literals.
// Without this, sorting of tailwind classes and auto indenting for long strings doesn't work.
function tw(strings: TemplateStringsArray) {
  return String.raw(strings);
}

// Merge tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, tw };
