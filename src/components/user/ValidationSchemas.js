import * as yup from "yup";

export const registerValidationSchema = ({
  nameRequired,
  emailRequired,
  passwordRequired,
}) => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_]*$/,
        "The name value must not contain punctuation symbols apart from underscore (_)"
      )
      .when("$nameRequired", (nameRequired, schema) =>
        nameRequired ? schema.required("Name is required") : schema
      ),
    email: yup
      .string()
      .email()
      .test(
        "is-noroff-email",
        "The email value must be a valid stud.noroff.no or noroff.no email address",
        function (value) {
          const { path, createError } = this;
          if (
            /.*@stud\.noroff\.no/.test(value) ||
            /.*@noroff\.no/.test(value)
          ) {
            return true;
          } else {
            return createError({
              path,
              message:
                "The email value must be a valid stud.noroff.no or noroff.no email",
            });
          }
        }
      )
      .when("$emailRequired", (emailRequired, schema) =>
        emailRequired ? schema.required("Email is required") : schema
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .when("$passwordRequired", (passwordRequired, schema) =>
        passwordRequired ? schema.required("Password is required") : schema
      ),
  });
};

export const loginValidationSchema = ({ emailRequired, passwordRequired }) => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .when("$emailRequired", (emailRequired, schema) =>
        emailRequired ? schema.required("Email is required") : schema
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .when("$passwordRequired", (passwordRequired, schema) =>
        passwordRequired ? schema.required("Password is required") : schema
      ),
  });
};
