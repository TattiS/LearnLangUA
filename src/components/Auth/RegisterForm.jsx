import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import registerSchema from "./registerScheme";
import css from "./RegisterForm.module.css";
import { registerThunk } from "@/store/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterForm = ({ onSubmitSuccess, onGoToLogin }) => {
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
    resolver: yupResolver(registerSchema),
    defaultValues: { nick: "", email: "", psw: "" },
  });

  useEffect(() => {
    setFocus("nick");
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      onSubmitSuccess?.();
    } catch {}
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="register-title"
      noValidate
    >
      <h2 id="register-title" className={css.title}>
        Create an account
      </h2>

      <label className={css.label}>
        <span>Name</span>
        <input
          className={css.input}
          type="text"
          placeholder="Your name"
          autoComplete="name"
          {...register("nick")}
          aria-invalid={!!errors.nick || undefined}
          aria-describedby={errors.nick ? "err-nick" : undefined}
        />
        {errors.nick && (
          <p id="err-nick" className={css.err}>
            {errors.nick.message}
          </p>
        )}
      </label>
      <label className={css.label}>
        <span>Email</span>
        <input
          className={css.input}
          type="email"
          placeholder="your@example.com"
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
      </label>
      <label className={css.label}>
        <span>Password</span>
        <input
          className={css.input}
          type="password"
          placeholder="••••••••"
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
      </label>

      {serverError && <p className={css.errGlobal}>{String(serverError)}</p>}

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitBtn}
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Creating..." : "Sign up"}
        </button>

        <button
          type="button"
          className={css.secondaryBtn}
          onClick={onGoToLogin}
        >
          I already have an account
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
