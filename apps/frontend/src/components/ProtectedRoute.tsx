import React, { type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isPending, isSuccess, isAuthenticated } = useUser();

  React.useEffect(() => {
    // User is not logged in, so redirect to login page
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      toast("Not logged in yet? Let's get you signed in!", {
        style: {
          color: "var(--color-neutral-100)",
          backgroundColor: "var(--color-secondary-900)",
        },
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isPending && (
        <div className="flex min-h-screen items-center justify-center">
          <BeatLoader color="#b63b63" />
        </div>
      )}
      {isSuccess && (
        <div className="flex-center-col min-h-full">{children}</div>
      )}
    </>
  );
}

export default ProtectedRoute;
