import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RegisterModal.module.css";

// Updated import to pull from your new authSlice structure
import {
  registerUser,
  clearError,
  resetRegistrationSuccess,
} from "../../redux/slices/authSlice";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import Toast from "../../components/Toast/Toast";

function RegisterModal() {
  const dispatch = useDispatch();

  // Updated selector to match your new initial state structure
  const { isLoading, error, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobileNumber: "",
    password: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    state: "",
    address: "",
    termsAccepted: false,
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: error });
    }
  }, [error]);

  useEffect(() => {
    if (registrationSuccess) {
      setToast({ type: "success", message: "Account created successfully!" });
    }
  }, [registrationSuccess]);

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetRegistrationSuccess());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      setToast({ type: "error", message: "First and Last Name are required." });
      return false;
    }
    if (!formData.gender) {
      setToast({ type: "error", message: "Please select your gender." });
      return false;
    }
    if (!formData.email?.trim()) {
      setToast({ type: "error", message: "Email is required." });
      return false;
    }
    if (
      !formData.mobileNumber?.trim() ||
      !/^\d{10}$/.test(formData.mobileNumber)
    ) {
      setToast({
        type: "error",
        message: "Valid 10-digit mobile number required.",
      });
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setToast({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return false;
    }
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      setToast({
        type: "error",
        message: "Complete Date of Birth is required.",
      });
      return false;
    }
    if (!formData.state) {
      setToast({ type: "error", message: "Please select your state." });
      return false;
    }
    if (!formData.address?.trim()) {
      setToast({ type: "error", message: "Address is required." });
      return false;
    }
    if (!formData.termsAccepted) {
      setToast({
        type: "error",
        message: "You must accept the Terms & Conditions.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(null);

    if (!validate()) return;

    // Construct Date
    const monthIndex = months.indexOf(formData.dobMonth);
    const dobDate = new Date(formData.dobYear, monthIndex, formData.dobDay);

    // Prepare Payload
    // Note: We send firstName and lastName separate here because the new thunk handles the combining.
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email,
      password: formData.password,
      // Pass other fields so the thunk can forward them
      gender: formData.gender,
      phoneNumber: formData.mobileNumber,
      dob: dobDate,
      state: formData.state,
      address: formData.address,
    };

    console.log("Registering:", payload);
    dispatch(registerUser(payload));
  };

  const switchToLogin = () => {
    dispatch(openModal({ type: "login" }));
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

        {registrationSuccess ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2 style={{ color: "#28a745", marginBottom: "15px" }}>Success!</h2>
            <p style={{ color: "#555", marginBottom: "25px" }}>
              Your account has been created successfully.
            </p>
            <button onClick={switchToLogin} className={styles.submitButton}>
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <div className={styles.headerContainer}>
              <img
                src="/favicon.svg"
                alt="Brain Buzz"
                className={styles.logo}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Row 1: Names */}
              <div className={styles.row}>
                <input
                  type="text"
                  name="firstName"
                  className={styles.inputField}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  className={styles.inputField}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 2: Gender & Email */}
              <div className={styles.row}>
                <select
                  name="gender"
                  className={`${styles.selectField} ${
                    formData.gender ? styles.hasValue : ""
                  }`}
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="email"
                  name="email"
                  className={styles.inputField}
                  placeholder="Enter Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 3: Mobile & Password */}
              <div className={styles.row}>
                <input
                  type="tel"
                  name="mobileNumber"
                  className={styles.inputField}
                  placeholder="Enter Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  className={styles.inputField}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 4: Date of Birth */}
              <div>
                <label className={styles.dobLabel}>Date of Birth</label>
                <div className={styles.dobContainer}>
                  <select
                    name="dobDay"
                    className={`${styles.selectField} ${styles.dobSelect} ${
                      formData.dobDay ? styles.hasValue : ""
                    }`}
                    value={formData.dobDay}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Day
                    </option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dobMonth"
                    className={`${styles.selectField} ${styles.dobSelect} ${
                      formData.dobMonth ? styles.hasValue : ""
                    }`}
                    value={formData.dobMonth}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Month
                    </option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dobYear"
                    className={`${styles.selectField} ${styles.dobSelect} ${
                      formData.dobYear ? styles.hasValue : ""
                    }`}
                    value={formData.dobYear}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Year
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: State */}
              <div className={styles.row}>
                <select
                  name="state"
                  className={`${styles.selectField} ${
                    formData.state ? styles.hasValue : ""
                  }`}
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Select State
                  </option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="TS">Telangana</option>
                  <option value="KA">Karnataka</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="DL">Delhi</option>
                  <option value="MH">Maharashtra</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="WB">West Bengal</option>
                </select>
              </div>

              {/* Row 6: Address */}
              <div className={styles.row}>
                <textarea
                  name="address"
                  className={styles.textAreaField}
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  className={styles.checkbox}
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                />
                <label htmlFor="terms" className={styles.checkboxLabel}>
                  Read and Accept the Terms & Conditions
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default RegisterModal;
