import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ForgotPasswordModal.module.css";
import { closeModal } from "../../redux/slices/modalSlice";
import { forgotPassword } from "../../api/apiRoutes";

function ForgotPasswordModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await forgotPassword({ email });
      setMessage("Password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalContent}>
      {/* Close Icon */}
      <button
        onClick={() => dispatch(closeModal())}
        className={styles.closeButton}
      >
        &times;
      </button>

      {/* Brain Buzz Logo */}
      <div className={styles.logoContainer}>
        <img src="/favicon.svg" alt="Brain Buzz Logo" />
        <h2>Brain Buzz</h2>
      </div>

      <h3 className={styles.subTitle}>Forgot Password</h3>

      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordModal;
