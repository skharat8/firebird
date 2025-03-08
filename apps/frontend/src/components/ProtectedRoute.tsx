import React, { type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  React.useEffect(() => {
    // User is not logged in, so redirect to login page
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isPending && (
        <div className="full-page">
          <GridLoader color="#b63b63" />
        </div>
      )}
      {isAuthenticated && children}
    </>
  );
}

export default ProtectedRoute;
