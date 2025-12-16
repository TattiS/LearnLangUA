import css from "./LoginForm.module.css";
import loginSchema from "./loginSchema";
import { loginThunk } from "../../redux/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const LoginForm = ({ onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const serverError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", psw: "" },
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      onSubmitSuccess?.();
    } catch {
      console.log(); //remove this line later
    }
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="login-title"
      noValidate
    >
      <h2 id="login-title" className={css.title}>
        Log In
      </h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <label className={css.label}>Email</label>
      <input
        className={css.input}
        type="email"
        placeholder="Email"
        autoComplete="email"
        {...register("email")}
        aria-invalid={!!errors.email || undefined}
        aria-describedby={errors.email ? "err-email" : undefined}
      />
      {errors.email && (
        <p id="err-email" className={css.err}>
          {errors.email.message}
        </p>
      )}

      <label className={css.label}>Password</label>
      <input
        className={css.input}
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...register("psw")}
        aria-invalid={!!errors.psw || undefined}
        aria-describedby={errors.psw ? "err-psw" : undefined}
      />
      {errors.psw && (
        <p id="err-psw" className={css.err}>
          {errors.psw.message}
        </p>
      )}

      {serverError && <p className={css.errGlobal}>{String(serverError)}</p>}

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitBtn}
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Creating..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
