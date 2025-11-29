import React, { useState } from "react";
import styles from "./AdminOnlineCoursesPage.module.css";
import Input from "../../../components/Input/Input"; // Your reusable Input
import Button from "../../../components/Button/Button"; // Your reusable Button

export default function AdminOnlineCoursesPage() {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    course: "",
    courseName: "",
    courseId: "",
    description: "",
    price: "",
    discount: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add API call logic here
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>Add Online Course</h2>

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        {/* Row 1: Dropdowns */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Category</label>
          <select
            className={styles.selectInput}
            value={formData.category}
            onChange={handleChange("category")}
          >
            <option value="">Select Category</option>
            <option value="upsc">UPSC</option>
            <option value="ssc">SSC</option>
            <option value="banking">Banking</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Select Sub Category</label>
          <select
            className={styles.selectInput}
            value={formData.subCategory}
            onChange={handleChange("subCategory")}
          >
            <option value="">Select Sub Category</option>
            <option value="prelims">Prelims</option>
            <option value="mains">Mains</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Select Course Type</label>
          <select
            className={styles.selectInput}
            value={formData.course}
            onChange={handleChange("course")}
          >
            <option value="">Select Course Type</option>
            <option value="foundation">Foundation Course</option>
            <option value="crash">Crash Course</option>
          </select>
        </div>

        {/* Row 2: Text Inputs */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Enter Course Name</label>
          <Input
            type="text"
            placeholder="e.g. GS Foundation 2025"
            value={formData.courseName}
            onChange={handleChange("courseName")}
            className={styles.inputOverwrite}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Enter Course ID</label>
          <Input
            type="text"
            placeholder="e.g. upsc-gs-2025"
            value={formData.courseId}
            onChange={handleChange("courseId")}
            className={styles.inputOverwrite}
          />
        </div>

        {/* Row 3: Description (Full Width) */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Enter Course Description</label>
          <Input
            textarea
            placeholder="Detailed description of the course..."
            value={formData.description}
            onChange={handleChange("description")}
            className={styles.textAreaOverwrite}
          />
        </div>

        {/* Row 4: Pricing */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Enter Course Price (₹)</label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={formData.price}
            onChange={handleChange("price")}
            className={styles.inputOverwrite}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Discount (%)</label>
          <Input
            type="number"
            placeholder="e.g. 10"
            value={formData.discount}
            onChange={handleChange("discount")}
            className={styles.inputOverwrite}
          />
        </div>

        {/* Row 5: File Uploads */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Thumbnail</label>
          <div className={styles.fileUploadBox}>
            <span className={styles.uploadIcon}>☁️</span>
            <span>Drag & drop or click to upload</span>
            <input type="file" className={styles.hiddenFileInput} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Main Image</label>
          <div className={styles.fileUploadBox}>
            <span className={styles.uploadIcon}>☁️</span>
            <span>Drag & drop or click to upload</span>
            <input type="file" className={styles.hiddenFileInput} />
          </div>
        </div>

        {/* Actions */}
        <div className={`${styles.actions} ${styles.fullWidth}`}>
          <Button
            label="Add Course"
            type="submit"
            variant="primary"
            className={styles.submitBtn}
          />
        </div>
      </form>
    </div>
  );
}
