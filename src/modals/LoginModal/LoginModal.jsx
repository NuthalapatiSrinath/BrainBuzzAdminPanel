import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginModal.module.css";

import {
  loginUser,
  clearError,
  resetRegistrationSuccess,
} from "../../redux/slices/authSlice";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import Toast from "../../components/Toast/Toast";

function LoginModal() {
  const dispatch = useDispatch();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: error });
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      setToast({ type: "success", message: "Logged in successfully!" });
      const timer = setTimeout(() => {
        dispatch(closeModal());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetRegistrationSuccess());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(null);
    dispatch(loginUser({ email, password }));
  };

  const switchToRegister = () => {
    dispatch(openModal({ type: "register" }));
  };

  const switchToForgotPassword = (e) => {
    e.preventDefault();
    dispatch(openModal({ type: "forgotPassword" }));
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(null);
            if (toast.type === "error") dispatch(clearError());
          }}
        />
      )}

      <div className={styles.modalContent}>
        <button onClick={handleClose} className={styles.closeButton}>
          &times;
        </button>

        <div className={styles.logoContainer}>
          <img src="/favicon.svg" alt="Brain Buzz Logo" />
          <h2>Brain Buzz</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <a
            href="/"
            onClick={switchToForgotPassword}
            className={styles.forgotPassword}
          >
            Forgot Password?
          </a>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={styles.switchModal}>
          Don't have an account?{" "}
          <button onClick={switchToRegister} className={styles.switchButton}>
            Register
          </button>
        </p>
      </div>
    </>
  );
}

export default LoginModal;
