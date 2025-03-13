import { useEffect, useState } from "react";

import styles from "./VisuallyHidden.module.css";

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

function VisuallyHidden({ children, ...rest }: VisuallyHiddenProps) {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (!import.meta.env.PROD) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Alt") {
          setForceShow(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }

    return undefined;
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <span className={styles.visuallyHidden} {...rest}>
      {children}
    </span>
  );
}

export default VisuallyHidden;
