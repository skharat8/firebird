import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, User } from "lucide-react";

import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import type { AuthType } from "@/data/types";
import { tw } from "@/lib/utils";
import { userLoginSchema, userSignupSchema } from "@/schemas/auth.zod";
import type { UserSignup } from "@/schemas/auth.zod";

import styles from "./Auth.module.css";
import useLogin from "./useLogin";
import useSignup from "./useSignup";

type AuthFormProps = {
  authType: AuthType;
  onAuthToggle: () => void;
};

function AuthForm({ authType, onAuthToggle }: AuthFormProps) {
  const validationSchema =
    authType === "login" ? userLoginSchema : userSignupSchema;

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<UserSignup>({
    // @ts-expect-error Passes if I use userSignupSchema. debug later
    resolver: zodResolver(validationSchema),
  });

  const loginButtonRef = useRef<HTMLButtonElement | null>(null);
  const { login, isLoginPending } = useLogin();
  const { signup, isSignupPending } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(data: UserSignup) {
    if (authType === "signup") {
      signup(data, {
        onSuccess: () => {
          // If user signup was successful, switch to log in screen.
          reset();
          onAuthToggle();
        },
      });
    } else {
      login(data);
    }
  }

  function handleGuestLogin() {
    clearErrors("email");
    clearErrors("password");
    setValue("email", "guest@gmail.com");
    setValue("password", "guest_password");
    loginButtonRef.current?.click();
  }

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const textInputStyles = tw`bg-card-400 dark:bg-neutral-400 dark:placeholder:text-neutral-800/70`;
  const errorStyles = "text-left text-sm font-bold text-primary-400/80 my-1";

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {authType === "signup" && (
        <div className={styles.formInput}>
          <User size={18} className={`${styles.icon} dark:text-neutral-900`} />
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className={textInputStyles}
            disabled={isLoginPending || isSignupPending}
          />
          <p className={errorStyles}>{errors.username?.message}</p>
        </div>
      )}

      <div className={styles.formInput}>
        <Mail size={18} className={`${styles.icon} dark:text-neutral-900`} />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className={textInputStyles}
          disabled={isLoginPending || isSignupPending}
        />
        <p className={errorStyles}>{errors.email?.message}</p>
      </div>

      <div className={styles.formInput}>
        <LockKeyhole
          className={`${`${styles.icon} dark:text-neutral-900`} ${styles.lock}`}
        />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={textInputStyles}
          disabled={isLoginPending || isSignupPending}
        />
        <Button
          type="button"
          variant="smallCaps"
          className="dark:text-neutral-900"
          onClick={toggleShowPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </Button>

        <p className={errorStyles}>{errors.password?.message}</p>
      </div>

      {authType === "login" && (
        <button
          className={styles.btnDemo}
          onClick={handleGuestLogin}
          disabled={isLoginPending || isSignupPending}
        >
          <span>Click here for a demo</span>
        </button>
      )}

      <Button
        type="submit"
        size="lg"
        ref={loginButtonRef}
        className="text-primary-foreground text-xl font-bold"
        disabled={isLoginPending || isSignupPending}
      >
        {isLoginPending || isSignupPending ? <SpinnerMini /> : authType}
      </Button>
    </form>
  );
}

export default AuthForm;
