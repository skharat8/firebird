import { useState } from "react";

function useToggle({
  initialValue = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggle = () => {},
}): [boolean, () => void] {
  const [on, setOn] = useState(initialValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
    onToggle();
  }

  return [on, toggle];
}

export default useToggle;
