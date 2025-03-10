import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import Button from "@/components/ui/Button";
import { StatusCode } from "@/data/enums";

function getErrorMessage(error: unknown): string {
  let msg: string;

  if (axios.isAxiosError(error)) {
    msg = error.message;

    if (error.status === StatusCode.NOT_FOUND) {
      msg = "404 Page Not Found";
    }
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

function ErrorPage({ customError }: { customError?: Error | null }) {
  let error = useRouteError();
  const navigate = useNavigate();

  if (customError) error = customError;

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className="centered-container flex-center-col max-w-[640px]">
      <div className="flex-center-col px-container-lr py-container-tb rounded-lg bg-zinc-200">
        <h1 className="main-title">Oops!</h1>
        <p className="text-secondary">
          Sorry, an unexpected error has occurred
        </p>
        <p className="text-error mb-4 font-semibold">
          <i>{getErrorMessage(error)}</i>
        </p>
        <Button onClick={navigateBack}>Go Back</Button>
      </div>
    </div>
  );
}

export default ErrorPage;
