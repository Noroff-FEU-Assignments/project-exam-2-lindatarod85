import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../../settings/api";
import { useNavigate, Link } from "react-router-dom";
import ResultMessage from "./ResultMessage";
import React, { useState, useEffect } from "react";
import styles from "../../styles/user/Register.module.css";
import { registerValidationSchema } from "./ValidationSchemas";
import { Helmet } from "react-helmet-async";

const validationSchema = registerValidationSchema({
  nameRequired: true,
  emailRequired: true,
  passwordRequired: true,
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [Result, setResult] = useState({
    success: false,
    error: false,
    message: "",
  });
  const [redirectDelay, setRedirectDelay] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(baseUrl + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setResult({
        success: true,
        error: false,
        message: "Registration successful",
      });
      setRedirectDelay(true);
    } catch (error) {
      setResult({
        success: false,
        error: true,
        message: "Registration failed",
      });
    }
  };

  useEffect(() => {
    if (redirectDelay && Result.success) {
      const delay = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [redirectDelay, Result.success, navigate]);

  return (
    <div className={styles.registerContainer}>
      <Helmet>
        <title>TweeMe | Register</title>
      </Helmet>
      <h1>Register</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">User Name:</label>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label htmlFor="email">Email:</label>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <button type="submit">Register</button>
      </form>

      <ResultMessage Result={Result} />
      <p>
        Allready have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
