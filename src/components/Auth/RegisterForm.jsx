import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import registerSchema from "./registerSchema";
import css from "./RegisterForm.module.css";
import { registerThunk } from "../../redux/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

const RegisterForm = ({ onSubmitSuccess }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const serverError = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
    defaultValues: { nick: "", email: "", psw: "" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      onSubmitSuccess?.();
    } catch {
      console.log(); //remove this line later
    }
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="register-title"
      noValidate
    >
      <div className={css.formTitleWrapper}>
        <h2 id="register-title" className={css.formTitle}>
          Registration
        </h2>
        <p className={css.formTxt}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>
      <div className={css.formInputGroup}>
        <div className={css.fieldWrapper}>
          <label
            htmlFor="name"
            className={clsx(css.formLbl, css.visuallyHidden)}
          >
            Name
          </label>
          <input
            id="name"
            className={clsx(css.formInput, errors.nick && css.inputError)}
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...register("nick")}
            aria-invalid={!!errors.nick || undefined}
            aria-describedby={errors.nick ? "err-nick" : undefined}
          />

          <p id="err-nick" className={css.formErr}>
            {errors.nick?.message || "\u00A0"}
          </p>
        </div>
        <div className={css.fieldWrapper}>
          <label
            htmlFor="email"
            className={clsx(css.formLbl, css.visuallyHidden)}
          >
            Email
          </label>
          <input
            id="email"
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
        <div className={clsx(css.fieldWrapper, css.passwordField)}>
          <label
            htmlFor="psw"
            className={clsx(css.formLbl, css.visuallyHidden)}
          >
            Password
          </label>
          <input
            id="psw"
            className={clsx(css.formInput, errors.psw && css.inputError)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            {...register("psw")}
            aria-invalid={!!errors.psw || undefined}
            aria-describedby={errors.psw ? "err-psw" : undefined}
          />
          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg width="20" height="20" className={css.iconOpen}>
                <use href="/sprite.svg#icon-eye-open" />
              </svg>
            ) : (
              <svg width="20" height="20" className={css.iconOff}>
                <use href="/sprite.svg#icon-eye-off" />
              </svg>
            )}
          </button>

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
          {loading || isSubmitting ? "Creating..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
