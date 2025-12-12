// src/components/AdminComponents/AdminEditor/AdminEditor.jsx
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Upload,
  X,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image as ImageIcon,
  Type,
} from "lucide-react";
import AdminPanelDropdown from "../AdminPanelDropdown/AdminPanelDropdown";
import styles from "./AdminEditor.module.css";

const AdminEditor = ({
  title = "Add New Content",
  initialData,
  onSave,
  onCancel,
}) => {
  const fileInputRef = useRef(null);

  // --- Form State ---
  const [formData, setFormData] = useState({
    title: "",
    category: null,
    subCategory: null,
    shortDescription: "",
    thumbnail: null,
    language: null,
    price: "",
    discount: "",
    fullDescription: "",
    ...initialData, // Override defaults if initialData exists
  });

  // Load initialData if it comes in later (e.g. from an API fetch)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, option) => {
    setFormData((prev) => ({ ...prev, [field]: option }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  // --- Mock Options (Replace with Props or Redux Data) ---
  const categoryOptions = [
    { label: "UPSC", value: "upsc" },
    { label: "SSC", value: "ssc" },
    { label: "Banking", value: "banking" },
    { label: "Railways", value: "railways" },
  ];

  const subCategoryOptions = [
    { label: "Prelims", value: "prelims" },
    { label: "Mains", value: "mains" },
    { label: "Interview", value: "interview" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "Telugu", value: "te" },
  ];

  // --- Toolbar Component (Visual Only for now) ---
  const EditorToolbar = () => (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        <button type="button" className={styles.toolbarBtn} title="Bold">
          <Bold size={16} />
        </button>
        <button type="button" className={styles.toolbarBtn} title="Italic">
          <Italic size={16} />
        </button>
        <button type="button" className={styles.toolbarBtn} title="Underline">
          <Underline size={16} />
        </button>
      </div>
      <div className={styles.toolbarGroup}>
        <button type="button" className={styles.toolbarBtn} title="Headings">
          <Type size={16} />
        </button>
        <button type="button" className={styles.toolbarBtn} title="Bullet List">
          <List size={16} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <div className={styles.toolbarGroup}>
        <button type="button" className={styles.toolbarBtn} title="Align Left">
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button type="button" className={styles.toolbarBtn} title="Align Right">
          <AlignRight size={16} />
        </button>
      </div>
      <div className={styles.toolbarGroup}>
        <button type="button" className={styles.toolbarBtn} title="Insert Link">
          <Link size={16} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{title}</h2>
        {onCancel && (
          <button
            className={styles.closeBtn}
            onClick={onCancel}
            title="Close Editor"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* ROW 1: Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Content Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the main title here..."
            className={styles.input}
            required
          />
        </div>

        {/* ROW 2: Categories (2 Cols) */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <AdminPanelDropdown
              options={categoryOptions}
              selectedOption={formData.category}
              onSelect={(opt) => handleDropdownChange("category", opt)}
              placeholder="Select Main Category"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Sub Category</label>
            <AdminPanelDropdown
              options={subCategoryOptions}
              selectedOption={formData.subCategory}
              onSelect={(opt) => handleDropdownChange("subCategory", opt)}
              placeholder="Select Sub Category"
            />
          </div>
        </div>

        {/* ROW 3: Short Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Short Description (Summary)</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            placeholder="A brief overview appearing on cards..."
            className={styles.input}
            rows="3"
            style={{ resize: "none" }}
          />
        </div>

        {/* ROW 4: Image Upload */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Thumbnail / Cover Image</label>
          <div
            className={styles.uploadContainer}
            onClick={() => fileInputRef.current.click()}
          >
            <Upload
              size={40}
              color="#9ca3af"
              style={{ marginBottom: "10px" }}
            />
            <p className={styles.uploadText}>
              <span className={styles.uploadHighlight}>Click to upload</span> or
              drag and drop
            </p>
            <p className={styles.uploadText}>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
          {/* File Preview Label */}
          {formData.thumbnail && (
            <div
              style={{
                fontSize: "0.85rem",
                color: "#059669",
                marginTop: "0.5rem",
              }}
            >
              Selected:{" "}
              {formData.thumbnail.name ||
                (typeof formData.thumbnail === "string"
                  ? "Existing Image"
                  : "New Image")}
            </div>
          )}
        </div>

        {/* ROW 5: Meta Data (Language, Price, Discount) - 3 Cols */}
        <div className={`${styles.row} ${styles["three-col"]}`}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Language</label>
            <AdminPanelDropdown
              options={languageOptions}
              selectedOption={formData.language}
              onSelect={(opt) => handleDropdownChange("language", opt)}
              placeholder="Select Language"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="0"
              className={styles.input}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* ROW 6: Enriched Full Description Editor */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Description / Content</label>
          <div className={styles.editorWrapper}>
            <EditorToolbar />
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              placeholder="Start writing your detailed content here..."
              className={styles.editorTextarea}
              rows="10"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          {onCancel && (
            <button
              type="button"
              className={`${styles.btn} ${styles.cancelBtn}`}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
            <Save size={18} />
            Save Content
          </button>
        </div>
      </form>
    </div>
  );
};

AdminEditor.propTypes = {
  title: PropTypes.string,
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default AdminEditor;
