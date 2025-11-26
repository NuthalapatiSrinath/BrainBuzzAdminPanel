import React from "react";
import styles from "./OrderCard.module.css";
import { Download, Calendar, Hash } from "lucide-react";

/**
 * OrderCard Component
 * Displays a single order item with details and invoice download.
 *
 * @param {Object} props
 * @param {string} props.title - Title of the course/product
 * @param {string} props.imageSrc - URL of the product image
 * @param {string} props.orderId - Unique Order ID
 * @param {string} props.date - Date of purchase
 * @param {string|number} props.price - Price of the item
 * @param {string} props.status - 'success' | 'pending' | 'failed'
 * @param {function} props.onDownloadInvoice - Handler for invoice download
 */
export default function OrderCard({
  title,
  imageSrc,
  orderId,
  date,
  price,
  status = "success",
  onDownloadInvoice,
}) {
  // Helper to determine status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return styles.statusSuccess;
      case "pending":
        return styles.statusPending;
      case "failed":
        return styles.statusFailed;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.card}>
      {/* Left: Image */}
      <div className={styles.imageContainer}>
        <img
          src={imageSrc || "/images/defaultthumb.png"}
          alt={title}
          className={styles.productImage}
          onError={(e) => (e.target.src = "/images/defaultthumb.png")}
        />
      </div>

      {/* Middle: Details */}
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Hash size={14} />
            <span>Order ID: {orderId}</span>
          </div>
          <div className={styles.metaItem}>
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Right: Actions & Price */}
      <div className={styles.actions}>
        <div className={styles.price}>₹{price}</div>

        <span className={`${styles.statusBadge} ${getStatusClass(status)}`}>
          {status}
        </span>

        {status.toLowerCase() === "success" && (
          <button className={styles.invoiceBtn} onClick={onDownloadInvoice}>
            <Download size={14} />
            Invoice
          </button>
        )}
      </div>
    </div>
  );
}
