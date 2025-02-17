// import { ImSpinner2 } from "react-icons/im";
import { Loader } from "lucide-react";
import styles from "./SpinnerMini.module.css";

function SpinnerMini() {
  return <Loader className={styles.spinnerMini} />;
}

export default SpinnerMini;
