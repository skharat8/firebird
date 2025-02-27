import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/ui/Logo";
import Auth from "@/features/authentication/Auth";
import useUser from "@/hooks/useUser";
import logo from "@images/firebird.svg";
import HeroTitle from "@/components/ui/HeroTitle";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-full flex-col sm:flex-row">
      <div
        className="-mb-17 basis-[15rem] bg-[url(@images/firebird.svg)] bg-cover bg-[0_50px]
          sm:basis-[40%] sm:bg-center"
      ></div>

      {/* Background Pattern */}

      {/* <div
        className="background-pattern absolute bottom-0 h-[calc(100%-15rem)] w-full sm:left-0
          sm:h-full sm:w-[60%]"
      ></div> */}

      <div className="z-2 flex-center-col mx-auto max-w-[640px] p-4 pb-8">
        <HeroTitle title="Firebird" backgroundColor="bg-card" />
        <h2 className="text-primary-700 mb-3 max-w-[15ch] pb-1 text-center text-xl font-extrabold">
          A Modern Social Media Platform
        </h2>
        <Auth />
      </div>
    </div>
  );
}

export default Login;
