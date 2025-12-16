import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import registerSchema from "./registerSchema";
import css from "./RegisterForm.module.css";
import { registerThunk } from "../../redux/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterForm = ({ onSubmitSuccess }) => {
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
      <h2 id="register-title" className={css.title}>
        Registration
      </h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <label htmlFor="name" className={css.srOnly}>
        Name
      </label>
      <input
        id="name"
        className={css.input}
        type="text"
        placeholder="Name"
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

      <label className={css.srOnly}>Email</label>
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

      <label className={css.srOnly}>Password</label>
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

export default RegisterForm;
