import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) navigate("/login");
  }, [isPending, isAuthenticated, navigate]);

  if (isPending)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BeatLoader color="#b63b63" />
      </div>
    );

  return isAuthenticated ? (
    <div className="bg-neutral flex-center-col min-h-full">{children}</div>
  ) : null;
}

export default ProtectedRoute;
