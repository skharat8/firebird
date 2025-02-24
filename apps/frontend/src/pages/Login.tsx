import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/ui/Logo";
import Auth from "@/features/authentication/Auth";
import useUser from "@/hooks/useUser";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="centered-container flex-center-col">
      <h1 className="main-title">Firebird</h1>
      <h2 className="subtitle">A Modern Twitter Experience</h2>
      <Logo marginBottom="1.5em" hasHoverEffect />
      <Auth />
    </div>
  );
}

export default Login;
