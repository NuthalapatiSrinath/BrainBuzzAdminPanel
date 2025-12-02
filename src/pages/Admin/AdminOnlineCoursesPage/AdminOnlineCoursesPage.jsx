import React, { useState, useEffect } from "react";
import styles from "./AdminOnlineCoursesPage.module.css";

// Components
import Input from "../../../components/Input/Input";
import AdminPanelDropdown from "../../../components/AdminComponents/AdminPanelDropdown/AdminPanelDropdown";
import Button from "../../../components/Button/Button";
import TakeNotes from "../../../components/TakeNotes/TakeNotes"; // Using as Rich Text Editor

export default function AdminOnlineCoursesPage() {
  // --- Form State ---
  const [formData, setFormData] = useState({
    title: "",
    educator: "",
    category: "",
    subcategory: "",
    price: "",
    discount: "",
    validity: "",
    thumbnail: "",
    demoVideoUrl: "",
    language: "",
    description: "", // HTML or Rich Text
    features: "", // Store as comma-separated or similar
  });

  // --- Dropdown Options (Mock Data - Replace with API data) ---
  const categoryOptions = [
    { label: "UPSC", value: "upsc" },
    { label: "SSC", value: "ssc" },
    { label: "Banking", value: "banking" },
    { label: "Railways", value: "railways" },
  ];

  const subCategoryOptions = {
    upsc: [
      { label: "UPSC CSE", value: "upsc_cse" },
      { label: "UPSC ESE", value: "upsc_ese" },
    ],
    ssc: [
      { label: "CGL", value: "cgl" },
      { label: "CHSL", value: "chsl" },
    ],
    banking: [
      { label: "IBPS PO", value: "ibps_po" },
      { label: "SBI Clerk", value: "sbi_clerk" },
    ],
  };

  const languageOptions = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Hinglish", value: "hinglish" },
    { label: "Telugu", value: "telugu" },
  ];

  // --- Derived State ---
  const [availableSubcats, setAvailableSubcats] = useState([]);

  // --- Effects ---
  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category && subCategoryOptions[formData.category.value]) {
      setAvailableSubcats(subCategoryOptions[formData.category.value]);
      // Reset subcategory if it doesn't match new category
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    } else {
      setAvailableSubcats([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.category]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, option) => {
    setFormData((prev) => ({ ...prev, [field]: option }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Course Data:", formData);
    // Add API call here: await createContent({...formData, type: 'online-course'})
    alert("Course Added Successfully (Check Console)");
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* SECTION 1: BASIC INFO */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <label>Course Title</label>
              <Input
                placeholder="Enter course title (e.g. UPSC CSE 2025 Complete Batch)"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className={styles.col}>
              <label>Educator Name</label>
              <Input
                placeholder="e.g. Dr. Vikas Divyakirti"
                value={formData.educator}
                onChange={(e) =>
                  setFormData({ ...formData, educator: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label>Category</label>
              <AdminPanelDropdown
                options={categoryOptions}
                selectedOption={formData.category}
                onSelect={(opt) => handleDropdownChange("category", opt)}
                placeholder="Select Category"
              />
            </div>
            <div className={styles.col}>
              <label>Sub-Category</label>
              <AdminPanelDropdown
                options={availableSubcats}
                selectedOption={formData.subcategory}
                onSelect={(opt) => handleDropdownChange("subcategory", opt)}
                placeholder={
                  formData.category
                    ? "Select Subcategory"
                    : "Select Category First"
                }
                disabled={!formData.category}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: PRICING & VALIDITY */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Pricing & Validity</h3>
          <div className={styles.row3}>
            <div className={styles.col}>
              <label>Price (₹)</label>
              <Input
                type="number"
                placeholder="e.g. 4999"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className={styles.col}>
              <label>Discount Label</label>
              <Input
                placeholder="e.g. 50% OFF"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
              />
            </div>
            <div className={styles.col}>
              <label>Validity</label>
              <Input
                placeholder="e.g. 12 Months"
                value={formData.validity}
                onChange={(e) =>
                  setFormData({ ...formData, validity: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: MEDIA */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Media & Preview</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <label>Thumbnail URL</label>
              <Input
                placeholder="https://example.com/image.png"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
              {formData.thumbnail && (
                <div className={styles.previewBox}>
                  <img src={formData.thumbnail} alt="Preview" />
                  <span>Thumbnail Preview</span>
                </div>
              )}
            </div>
            <div className={styles.col}>
              <label>Demo Video URL</label>
              <Input
                placeholder="https://youtube.com/..."
                value={formData.demoVideoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, demoVideoUrl: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: CONTENT DETAILS */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Course Content</h3>

          <div className={styles.row}>
            <div className={styles.col}>
              <label>Language</label>
              <AdminPanelDropdown
                options={languageOptions}
                selectedOption={formData.language}
                onSelect={(opt) => handleDropdownChange("language", opt)}
                placeholder="Select Language"
              />
            </div>
          </div>

          <div className={styles.colFull}>
            <label>Description</label>
            {/* Using TakeNotes as a placeholder for a rich text editor */}
            <div className={styles.editorWrapper}>
              <TakeNotes
                placeholder="Type detailed course description here..."
                // Note: You might need to adjust TakeNotes to handle onChange properly if it's strictly for notes
              />
            </div>
          </div>

          <div className={styles.colFull}>
            <label>Features (Comma separated)</label>
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="Live Classes, PDF Notes, 1-on-1 Mentorship..."
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actionRow}>
          <Button
            text="Publish Course"
            type="primary" // Assuming 'primary' variant exists in your Button component
            onClick={handleSubmit}
            style={{ padding: "12px 40px", fontSize: "1rem" }}
          />
        </div>
      </form>
    </div>
  );
}
