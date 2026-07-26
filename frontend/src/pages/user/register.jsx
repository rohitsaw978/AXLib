import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaChartLine,
  FaTachometerAlt,
  FaBookOpen,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";



import { Server_URL } from "../../utils/config";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toasthelper";

import { useGoogleLogin } from "@react-oauth/google";


export default function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const response = await axios.post(
        `${Server_URL}users/google`,
        {
          access_token: tokenResponse.access_token,
        }
      );

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      showSuccessToast("Google Login Successful!");
      navigate("/", {
  replace: true,
});
    } catch (error) {
      console.error(error);
    }
  },
});


  const onSubmit = async (data) => {
    try {

      const formData = {
        ...data,
        role: "user",
      };

      await axios.post(
        `${Server_URL}users/register`,
        formData
      );

      showSuccessToast(
        "Registration Successful!"
      );

      reset();

    } catch (error) {

      // console.log(error);

      showErrorToast(
        "Registration Failed!"
      );
    }
  };

  return (
    <div className="register-page">


      {/* Left Side */}

      <div className="left-section">
        <div className="left-content">

          <h1>
            Create Your Account
            <br />
            Join <span>AXLIB</span> Today!
          </h1>

          <p className="subtitle">
            Manage books, track progress,
            and explore knowledge like
            never before.
          </p>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>
                <FaBookOpen className="feature-icon"/>
                &nbsp;&nbsp;Smart Library
              </h3>
              <p>
                Access thousands of books
                in one place.
              </p>
            </div>

            <div className="feature-card">
              <h3>
                <FaStar className="feature-icon" />
                &nbsp;&nbsp;Book Reviews
              </h3>
              <p>
                Discover top rated books.
              </p>
            </div>

            <div className="feature-card">
              <h3>
                <FaChartLine className="feature-icon" />
                &nbsp;&nbsp;Analytics
              </h3>
              <p>
                Track reading activity and
                progress.
              </p>
            </div>

            <div className="feature-card">
              <h3>
                <FaTachometerAlt className="feature-icon" />
                &nbsp;&nbsp;Dashboard Overview
              </h3>
              <p>
                Complete overview of your
                account.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Right Side */}

      <div className="right-section">
        <div className="register-card">

          <div className="user-circle">
            <FaUser />
          </div>

          <h2>Create Account</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="error">
                {errors.name.message}
              </p>
            )}

            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            {errors.email && (
              <p className="error">
                {errors.email.message}
              </p>
            )}

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                {...register("password", {
                  required:
                    "Password is required",
                })}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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
              <p className="error">
                {errors.password.message}
              </p>
            )}

            <div className="input-box">
              <FaBook className="input-icon" />
              <input
                type="text"
                placeholder="Stream"
                {...register("stream", {
                  required:
                    "Stream is required",
                })}
              />
            </div>

            {errors.stream && (
              <p className="error">
                {errors.stream.message}
              </p>
            )}

            <div className="input-box">
              <FaCalendarAlt className="input-icon" />
              <input
                type="number"
                placeholder="Year"
                {...register("year", {
                  required:
                    "Year is required",
                })}
              />
            </div>

            {errors.year && (
              <p className="error">
                {errors.year.message}
              </p>
            )}

            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the
                <span>
                  &nbsp;Terms & Conditions&nbsp;
                </span>
                and
                <span>
                  &nbsp;Privacy Policy&nbsp;
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Sign Up
            </button>

            <div className="divider">
              <span>
                or continue with
              </span>
            </div>

            <button
  type="button"
  className="google-btn"
  onClick={() => googleLogin()}
>
  <FcGoogle className="google-logo" />
  <span>Continue with Google</span>
</button>
          </form>

        </div>
      </div>

    </div>
  );
}