import * as yup from "yup";

const registerSchema = yup.object({
  nick: yup.string().trim().required("Nickname is required"),
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

export default registerSchema;
