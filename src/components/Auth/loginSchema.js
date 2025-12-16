import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  psw: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default loginSchema;
