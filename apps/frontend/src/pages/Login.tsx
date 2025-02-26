import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/ui/Logo";
import Auth from "@/features/authentication/Auth";
import useUser from "@/hooks/useUser";
import logo from "@images/firebird.svg";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-full bg-[url(@images/firebird.svg)] bg-cover bg-center">
      <div className="centered-container flex-center-col isolate max-w-[640px]">
        <div className="bg-card/80 mb-4 rounded-xl p-4 pt-6">
          <h1 className="font-header mb-1 text-center text-5xl font-bold">
            Firebird
          </h1>
          <h2 className="font-subheader max-w-[20ch] text-center text-xl italic">
            A Modern Social Media Experience
          </h2>
        </div>
        <Auth />
      </div>
    </div>
  );
}

export default Login;
