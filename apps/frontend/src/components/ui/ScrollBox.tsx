import type { ReactNode } from "react";
import { GridLoader } from "react-spinners";

import { cn } from "@/lib/utils";

type Data = { id: string; [key: string]: string };

type ScrollBoxProps = {
  title: string;
  data?: Data[];
  isPending: boolean;
  children: (item: Data) => ReactNode;
  className?: string;
};

function ScrollBox({
  title,
  data,
  isPending,
  children,
  className,
}: ScrollBoxProps) {
  return (
    <div className={cn(className, "overflow-hidden rounded-xl shadow-xl")}>
      <p
        className="bold dark:bg-card/80 bg-card border-card-400 dark:border-card-800/30
          dark:text-card-500 text-card-800 sticky top-0 border-b-2 px-6 py-4 font-bold"
      >
        {title}
      </p>

      <div
        className="bg-card-300 dark:bg-card text-card-900 dark:text-card-100 h-[32vh] overflow-auto
          px-6 py-3"
      >
        {isPending && <GridLoader color="var(--color-primary)" />}
        {data && (
          <ul>
            {data.map((item) => (
              <li
                key={item.id}
                className="dark:text-card-200 text-card-800 mb-6 flex items-center gap-4 last:mb-0"
              >
                {typeof children === "function" ? children(item) : children}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ScrollBox;
