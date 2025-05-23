import React from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { ZodError } from "zod";

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
  } else if (error instanceof ZodError) {
    msg = "Zod Error";
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
  const error = useRouteError();
  const navigate = useNavigate();
  const [_, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

  React.useEffect(() => {
    // Break out of forbidden status loop in case of server error
    if (axios.isAxiosError(error) && error.status === StatusCode.FORBIDDEN) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [error, navigate, setIsAuthenticated]);

  function navigateHome() {
    navigate("/");
  }

  return (
    <div className="centered-container flex-center-col max-w-[640px]">
      <div
        className="flex-center-col px-container-lr py-container-tb bg-card rounded-lg shadow-xl
          dark:shadow-md"
      >
        <h1 className="header-text text-primary mb-6 text-5xl">Oops!</h1>
        <p className="mb-2 text-neutral-900 dark:text-neutral-100">
          Sorry, an unexpected error has occurred
        </p>
        <p className="text-primary mb-4 text-center text-2xl font-semibold">
          {getErrorMessage(error)}
        </p>
        <Button onClick={navigateHome}>Go Back</Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
