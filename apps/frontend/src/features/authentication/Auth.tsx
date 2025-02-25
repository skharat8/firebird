import { useState } from "react";
import { Toaster } from "react-hot-toast";

import type { AuthType } from "@/data/types";
import { Card, CardTitle } from "@/components/ui/Card";
import AuthForm from "./AuthForm";
import AuthLink from "./AuthLink";
import styles from "./Auth.module.css";

function Auth() {
  const [authType, setAuthType] = useState<AuthType>("login");

  function onAuthToggle() {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "signup" : "login",
    );
  }

  return (
    <Card className="px-container-lr py-container-tb bg-neutral-foreground text-center">
      <Toaster />
      <CardTitle className="text-4xl">{authType}</CardTitle>
      <div className="bg-primary mx-auto mb-3 mt-2 h-[3px] w-[15%]" />

      <AuthForm authType={authType} onAuthToggle={onAuthToggle} />
      <AuthLink authType={authType} onAuthToggle={onAuthToggle} />
    </Card>
  );
}

export default Auth;
