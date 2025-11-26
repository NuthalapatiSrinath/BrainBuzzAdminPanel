import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Using a specific CSS module for this component
import styles from "./ResetPasswordModal.module.css";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import { resetPassword } from "../../api/apiRoutes";
import { useNavigate } from "react-router-dom";

function ResetPasswordModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const validate = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError(
        "Invalid or missing token. Please click the link in your email again."
      );
      return;
    }

    if (!validate()) return;

    setLoading(true);
    try {
      await resetPassword({ token, newPassword });
      setSuccess("Password reset successfully! You can now login.");
      setNewPassword("");
      setConfirmPassword("");

      // Clear the token from the URL
      navigate("/", { replace: true });

      // Switch to Login modal after a short delay
      setTimeout(() => {
        dispatch(openModal({ type: "login" }));
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
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

      <h3 className={styles.subTitle}>Reset Password</h3>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>New Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter new password"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Confirm New Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            placeholder="Confirm new password"
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            id="show"
            type="checkbox"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          <label
            htmlFor="show"
            className={styles.label}
            style={{ marginBottom: 0, fontWeight: "normal" }}
          >
            Show passwords
          </label>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordModal;
