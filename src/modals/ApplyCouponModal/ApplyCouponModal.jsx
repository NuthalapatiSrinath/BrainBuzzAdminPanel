import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ApplyCouponModal.module.css";
// FIX: Adjust the path to point correctly to the redux slices folder
// Assuming structure: src/modals/ApplyCouponModal/ApplyCouponModal.jsx -> ../../redux/slices/modalSlice
import { closeModal } from "../../redux/slices/modalSlice";

// Mock Coupons Data
const AVAILABLE_COUPONS = [
  {
    id: 1,
    code: "FIRST50",
    desc: "Get 50% off on your first purchase",
    value: "Save ₹500",
  },
  {
    id: 2,
    code: "SUMMER25",
    desc: "Special Summer Sale Discount",
    value: "Save ₹250",
  },
  {
    id: 3,
    code: "EXAMREADY",
    desc: "Exam Preparation Special",
    value: "Save ₹100",
  },
];

export default function ApplyCouponModal() {
  const dispatch = useDispatch();
  const [inputCode, setInputCode] = useState("");

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleApply = (code) => {
    // Logic to apply coupon goes here (e.g., updating Redux cart state)
    alert(`Applied Coupon: ${code}`);
    dispatch(closeModal());
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Apply Coupon</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className={styles.couponInput}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button
          className={styles.applyBtn}
          onClick={() => handleApply(inputCode)}
          disabled={!inputCode.trim()}
        >
          APPLY
        </button>
      </div>

      {/* List Section */}
      <div className={styles.couponList}>
        <h4 className={styles.listTitle}>Available Coupons</h4>

        {AVAILABLE_COUPONS.map((coupon) => (
          <div key={coupon.id} className={styles.couponCard}>
            <div className={styles.couponInfo}>
              <span className={styles.code}>{coupon.code}</span>
              <span className={styles.desc}>{coupon.desc}</span>
              <span className={styles.discountAmount}>{coupon.value}</span>
            </div>
            <button
              className={styles.listApplyBtn}
              onClick={() => handleApply(coupon.code)}
            >
              APPLY
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
