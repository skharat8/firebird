/* eslint-disable react/jsx-no-bind */
import { Check, Moon, Sun } from "lucide-react";

import Button from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useTheme } from "@/components/ThemeProvider";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="navbar" size="icon">
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90
              dark:scale-0"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
              dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
          {theme === "light" && <Check className="ms-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
          {theme === "dark" && <Check className="ms-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
          {theme === "system" && <Check className="ms-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
