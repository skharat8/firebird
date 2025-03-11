import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import axios from "axios";

import Button from "@/components/ui/Button";
import { StatusCode } from "@/data/enums";

function parseStatusCodes(status: StatusCode): string | null {
  let msg;

  switch (status) {
    case StatusCode.NOT_FOUND:
      msg = "Looks like this page does not exist";
      break;
    case StatusCode.FORBIDDEN:
      msg = "Restricted Access";
      break;
    case StatusCode.UNAUTHORIZED:
      msg = "Looks like you are not logged in";
      break;
    default:
      msg = null;
  }

  return msg;
}

function getErrorMessage(error: unknown): string {
  let msg: string;

  if (axios.isAxiosError(error)) {
    msg = parseStatusCodes(error.status as StatusCode) ?? error.message;
  } else if (isRouteErrorResponse(error)) {
    msg = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    msg = error.message;
  } else if (typeof error === "string") {
    msg = error;
  } else {
    console.error(error);
    msg = "Unknown error";
  }

  return msg;
}

function ErrorFallback() {
  const routeError = useRouteError();
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/");
  }

  return (
    <div className="centered-container flex-center-col max-w-[640px]">
      <div
        className="flex-center-col px-container-lr py-container-tb bg-card dark:shadow-primary-800
          rounded-lg shadow-xl dark:shadow-md"
      >
        <h1 className="header-text mb-4 text-5xl">Oops!</h1>
        <p className="text-neutral-900">
          Sorry, an unexpected error has occurred
        </p>
        <p className="text-error mb-4 font-semibold">
          {getErrorMessage(routeError)}
        </p>
        <Button onClick={navigateHome}>Go Back</Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
