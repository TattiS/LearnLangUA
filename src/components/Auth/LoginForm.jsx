import clsx from "clsx";
import css from "./LoginForm.module.css";
import loginSchema from "./loginSchema";
import { loginThunk } from "../../redux/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const serverError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setFocus,
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", psw: "" },
  });

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
      <div className={css.formTitleWrapper}>
        <h2 id="login-title" className={css.formTitle}>
          Log In
        </h2>
        <p className={css.formTxt}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <div className={css.formInputGroup}>
        <div className={css.fieldWrapper}>
          <label className={clsx(css.formLbl, css.visuallyHidden)}>Email</label>
          <input
            className={clsx(css.formInput, errors.email && css.inputError)}
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? "err-email" : undefined}
          />

          <p id="err-email" className={css.formErr}>
            {errors.email?.message || "\u00A0"}
          </p>
        </div>
        <div className={css.fieldWrapper}>
          <label className={clsx(css.formLbl, css.visuallyHidden)}>
            Password
          </label>
          <input
            className={clsx(css.formInput, errors.psw && css.inputError)}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("psw")}
            aria-invalid={!!errors.psw || undefined}
            aria-describedby={errors.psw ? "err-psw" : undefined}
          />

          <p id="err-psw" className={css.formErr}>
            {errors.psw?.message || "\u00A0"}
          </p>
        </div>
        {serverError && <p className={css.errGlobal}>{String(serverError)}</p>}
      </div>
      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitBtn}
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Checking..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
