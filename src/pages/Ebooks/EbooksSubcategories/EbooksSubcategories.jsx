// src/pages/Ebooks/EbooksSubcategories/EbooksSubcategories.jsx

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EbooksSubcategories.module.css";

// 1. Import all the required components
import Header from "../../../components/Header/Header";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

// 2. Import the data, aliased as 'DATA'
import EBOOKS_DATA from "../../../data/ebooks.js";

export default function EbooksSubcategories() {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 3. Language state
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("bb_lang_code") || "en";
    } catch {
      return "en";
    }
  });

  // 4. Main data processing logic
  const entry = useMemo(() => {
    const key = String(paramCategory).toLowerCase();

    // Get main category details (for title and hero)
    const cat = EBOOKS_DATA.categories.find((c) => c.key === key);
    // Get the subcategory array for this key
    const subcategories = EBOOKS_DATA.subcategories[key] || [];

    // Map the data to a 'tiles' array for CategoryCard
    const tiles = subcategories.map((sub) => ({
      slug: sub.id, // Use 'id' from your data as the slug
      name: sub.title,
      logo: sub.logo,
      description: sub.description || "", // The new description field
      path: sub.path || `/ebooks/${key}/${sub.id}`,
    }));

    return {
      title: cat ? cat.title : key.toUpperCase(),
      hero: cat ? cat.hero : "/images/default-book.png", // Use category hero
      tiles: tiles,
    };
  }, [paramCategory]);

  // 5. Search filter logic
  const tiles = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return entry.tiles || [];
    // Filter by the 'name' property
    return (entry.tiles || []).filter((t) =>
      (t.name || "").toLowerCase().includes(q)
    );
  }, [entry, query]);

  // 6. Navigation handler
  const handleTileClick = (slug) => {
    // The slug is the sub.id (e.g., "foundation")
    navigate(`/ebooks/${paramCategory}/${slug}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 7. Top Header */}
      {entry.hero && (
        <Header imageSrc={entry.hero} alt={`${entry.title} hero`} />
      )}

      {/* 8. CategoryHeader */}
      <CategoryHeader
        title={entry.title}
        languages={[
          { key: "en", label: "English" },
          { key: "hi", label: "Hindi" },
          { key: "te", label: "Telugu" },
        ]}
        active={lang}
        onChange={(k) => {
          try {
            localStorage.setItem("bb_lang_code", k);
          } catch {}
          setLang(k);
        }}
        showDivider
      />

      {/* 9. Main content section */}
      <section className={styles.subSection}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>{entry.title} Subcategories</h2>
          <span className={styles.headingUnderline}></span>
        </div>

        {/* 10. SearchBar */}
        <div className={styles.searchRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search subcategories"
          />
        </div>

        {/* 11. Grid, using CategoryCard */}
        <div className={styles.grid}>
          {tiles.map((t) => (
            <CategoryCard
              key={t.slug}
              name={t.name}
              logo={t.logo}
              slug={t.slug}
              description={t.description}
              buttonLabel="View Books"
              onClick={handleTileClick} // This will pass 't.slug'
              ariaLabel={`View ${t.name} books`}
            />
          ))}

          {/* 12. No results message */}
          {tiles.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No subcategories match “{query}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
