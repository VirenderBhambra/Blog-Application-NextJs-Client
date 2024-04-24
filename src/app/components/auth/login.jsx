"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import axios from "axios";
import CryptoJS from "crypto-js";
import styles from "./login.module.css";
import Alert from "@mui/material/Alert";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [page, setPage] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);

  const cookies = new Cookies();

  function setTokenCookie(token) {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour
    cookies.set("token", `Bearer ${token}`, {
      path: "/",
      sameSite: "strict",
      expires: expirationTime,
    });
  }

  function setCookie(cookieName, value)
    {
      cookies.set(`${cookieName}`, value, {
        path: "/",
        sameSite: "strict",
      });
    }
    
  async function onSubmit(data) {
    try {
      data = JSON.stringify(data);
      const encryptedData = encryptFormData(data);
      console.log(encryptedData);
      const response = await axios.post(
        page
          ? `http://localhost:4000/user/login`
          : `http://localhost:4000/user/register`,
        encryptedData
      );
      const token = encodeURIComponent(
        response.headers.authorization.split(" ")[1]
      );

      setCookie("author",response.data.author);
      setCookie("user",response.data.user);
      setTokenCookie(token);

      setAlertMessage(response.data.message);
      setAlertSeverity("success");
      window.location.href = `http://localhost:3000/write`;

    } catch (error) {
      console.log(error);
      setAlertMessage(error?.response?.data?.error);
      setAlertSeverity("error");
    }

    reset(); // Reset form after submission
  }

  // Function to encrypt form data
  function encryptFormData(formData) {
    const encrypted = CryptoJS.AES.encrypt(formData, "secret_key").toString();
    return { data: encrypted };
  }

  return (
    <div className={styles.loginContainer}>
      <p className={styles.heading}>
        {page ? "Welcome back!" : "Let's get started!"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {page && (
          <>
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>
                Username/Email<span className="text-red-600">*</span>
              </p>
              <TextField
                {...register("email", { required: true })}
                label="Enter your username/email"
                variant="standard"
                fullWidth
                required
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>
                Password<span className="text-red-600">*</span>
              </p>
              <TextField
                {...register("password", { required: true })}
                label="Enter Password"
                variant="standard"
                type="password"
                fullWidth
                required
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </Box>
          </>
        )}
        {!page && (
          <>
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>
                First Name<span className="text-red-600">*</span>
              </p>
              <TextField
                {...register("firstName", { required: true })}
                label="Enter your first name"
                variant="standard"
                fullWidth
                required
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>Last Name</p>
              <TextField
                {...register("lastName")}
                label="Enter your last name"
                variant="standard"
                fullWidth
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>
                Username/Email<span className="text-red-600">*</span>
              </p>
              <TextField
                {...register("email", { required: true })}
                label="Enter your username/email"
                variant="standard"
                fullWidth
                required
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
              <p className={styles.inputLabel}>
                Password<span className="text-red-600">*</span>
              </p>
              <TextField
                {...register("password", { required: true })}
                label="Enter Password"
                variant="standard"
                type="password"
                fullWidth
                required
                className={styles.inputField}
              />
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <button type="submit" className={styles.submitButton}>
                Sign Up
              </button>
            </Box>
          </>
        )}
      </form>
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
          {alertMessage}
        </Alert>
      )}
      <Divider sx={{ my: 2 }} className={styles.orDivider}>
        <p>Or, Login with</p>
      </Divider>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button type="submit" className={styles.googleButton}>
          <GoogleIcon height={40} width={40} style={{ color: "white" }} />
          Sign up with Google
        </button>

        <p className={styles.registerLink}>
          {page ? "Don't have an account?" : "Have an account?"}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setPage(!page);
              reset(); // Reset form when switching between login and register
            }}
          >
            {page ? "Register here" : "Login"}
          </span>
        </p>
      </Box>
    </div>
  );
};

export default LoginPage;
