import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";

// Components
import MainModal from "../MainModal/MainModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
// Import the new modals
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import ResetPasswordModal from "../ResetPasswordModal/ResetPasswordModal";
import ApplyCouponModal from "../ApplyCouponModal/ApplyCouponModal";

function RenderModal() {
  const activeModal = useSelector((state) => state.modal.type);

  const allModals = {
    login: <LoginModal />,
    register: <RegisterModal />,
    forgotPassword: <ForgotPasswordModal />, // <--- ADDED
    resetPassword: <ResetPasswordModal />, // <--- ADDED
    applyCoupon: <ApplyCouponModal />,
  };

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {activeModal && allModals[activeModal] && (
          <motion.div
            key={activeModal}
            className={styles.RenderModal}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          >
            {allModals[activeModal]}
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
}

export default RenderModal;
