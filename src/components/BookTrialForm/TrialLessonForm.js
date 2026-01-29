import * as yup from "yup";

const trialLessonSchema = yup.object({
  fullName: yup.string().required("Enter your full name"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Enter your email"),
  phone: yup.string().required("Enter your phone number"),
});

export default trialLessonSchema;
