import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Offline() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/");
  }

  return (
    <div
      className="flex-center-col px-container-lr py-container-tb bg-card rounded-lg shadow-xl
        dark:shadow-md"
    >
      <h1 className="header-text mb-6 text-5xl">Oops!</h1>
      <p className="text-primary-400 mb-4 text-2xl font-semibold">
        Looks like you are offline
      </p>
      <Button onClick={navigateHome}>Go Back</Button>
    </div>
  );
}

export default Offline;
