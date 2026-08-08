import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Password Show / Hide
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${Server_URL}users/login`,
        data
      );

      const { role } = response.data.user;

      localStorage.setItem(
        "authToken",
        response.data.token
      );

      localStorage.setItem("role", role);

      if (
        role === "admin" ||
        role === "librarian"
      ) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      showSuccessToast("Login Successful!");
    } catch (error) {
  showErrorToast(
    error.response?.data?.message ||
    "Login Failed"
  );
}
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="login-header">
          <h2 className="login-title">
            Welcome Back
          </h2>

          <p className="login-subtitle">
            Login to your Library Account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >
          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <span className="error-text">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="form-input"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <span
                className="toggle-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>

            {errors.password && (
              <span className="error-text">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <button
              type="button"
              className="forgot-btn"
              onClick={() =>
                navigate("/forgetpassword")
              }
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn-submit"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}