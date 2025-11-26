import React, { useState } from "react";
import styles from "./MyOrdersPage.module.css";
import OrderCard from "../../components/OrderCard/OrderCard";

// Mock Data (Replace with API call in future)
const MOCK_ORDERS = [
  {
    id: "ORD-2024-001",
    title: "UPSC GS Foundation Course (Batch B54)",
    imageSrc: "/images/sub/ias.png",
    date: "12 Oct 2024",
    price: "10,000",
    status: "success",
  },
  {
    id: "ORD-2024-002",
    title: "SSC CGL Tier 1 Practice Set",
    imageSrc: "/images/cgl.png",
    date: "28 Sep 2024",
    price: "499",
    status: "success",
  },
  {
    id: "ORD-2024-003",
    title: "APPSC Group 1 Crash Course",
    imageSrc: "/images/appsc.png",
    date: "15 Aug 2024",
    price: "2,499",
    status: "failed",
  },
  {
    id: "ORD-2024-004",
    title: "Current Affairs Monthly E-Book (August)",
    imageSrc: "/images/current-affairs-banner.png",
    date: "01 Aug 2024",
    price: "50",
    status: "success",
  },
];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const handleDownloadInvoice = (orderId) => {
    // Logic to download invoice
    alert(`Downloading invoice for order: ${orderId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>My Orders</h1>
        <p className={styles.subTitle}>
          View and manage your purchase history and invoices.
        </p>
      </header>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "all" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Orders
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "success" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("success")}
        >
          Successful
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "failed" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("failed")}
        >
          Failed/Cancelled
        </button>
      </div>

      {/* List */}
      <div className={styles.ordersList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={order.id}
              title={order.title}
              imageSrc={order.imageSrc}
              date={order.date}
              price={order.price}
              status={order.status}
              onDownloadInvoice={() => handleDownloadInvoice(order.id)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No orders found</h3>
            <p>You haven't placed any orders in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
