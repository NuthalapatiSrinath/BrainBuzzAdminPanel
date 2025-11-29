import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AdminDateDropdown.module.css";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";

export default function AdminDateDropdown({
  date,
  onChange,
  variant = "primary", // 'primary' (bordered) or 'rich' (borderless colored)
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={`${styles.trigger} ${styles[variant]}`}
        onClick={toggle}
      >
        <div className={styles.left}>
          {/* Icon Box */}
          <span className={styles.iconWrap}>
            <FaCalendarAlt />
          </span>
          <span className={styles.dateText}>{date}</span>
        </div>
        <FaChevronDown
          className={`${styles.chev} ${isOpen ? styles.rotate : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {/* In a real app, you'd render a calendar component here */}
          <li className={styles.item} onClick={() => setIsOpen(false)}>
            Today
          </li>
          <li className={styles.item} onClick={() => setIsOpen(false)}>
            Yesterday
          </li>
          <li className={styles.item} onClick={() => setIsOpen(false)}>
            Pick Date...
          </li>
        </ul>
      )}
    </div>
  );
}

AdminDateDropdown.propTypes = {
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "rich"]),
};
