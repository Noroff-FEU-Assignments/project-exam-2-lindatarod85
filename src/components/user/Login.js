import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { baseUrl } from "../../settings/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ResultMessage from "./ResultMessage";
import styles from "../../styles/user/Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { loginValidationSchema } from "./ValidationSchemas";
import { Helmet } from "react-helmet-async";

const validationSchema = loginValidationSchema({
  emailRequired: true,
  passwordRequired: true,
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setToken, setName, setAvatar, setBanner } = useAuth();
  const [Result, setResult] = useState({
    success: false,
    error: false,
    message: "",
  });
  const [token, setLocalStorageToken] = useLocalStorage("token", "");

  useEffect(() => {
    if (token) {
      setResult({ success: true, error: false });
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(baseUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      const newToken = json.accessToken;
      setLocalStorageToken(newToken);
      setToken(newToken);

      const { name, avatar, banner } = json;
      setName(name);
      setAvatar(avatar);
      setBanner(banner);
    } catch (error) {
      setResult({
        success: false,
        error: true,
        message: "Login failed. Please check your email and password.",
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Helmet>
        <title>TweeMe | Login</title>
      </Helmet>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Login</button>
      </form>

      {Result.error && <ResultMessage Result={Result} />}
      <p>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
