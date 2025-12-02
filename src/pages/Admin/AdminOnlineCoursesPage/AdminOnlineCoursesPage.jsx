import React from "react";
import { useDispatch } from "react-redux";
import CategoryColumn from "../../../components/AdminComponents/CategoryColumn/CategoryColumn";
import styles from "./AdminOnlineCoursesPage.module.css";
import { AiOutlinePlus } from "react-icons/ai";

/**
 * AdminOnlineCoursesPage
 * Accepts optional `categories` prop (array). Uses demo data if not provided.
 */
const AdminOnlineCoursesPage = ({ categories }) => {
  const dispatch = useDispatch();

  const demoCategories = [
    {
      id: "cat-left",
      name: "",
      subcategories: [],
      special: "leftOnly", // this mimics the far-left empty column with only Add Sub Category link
    },
    {
      id: "cat-upsc",
      name: "UPSC",
      subcategories: [
        { id: "upsc-1", name: "Group 1" },
        { id: "upsc-2", name: "Group 2" },
        { id: "upsc-3", name: "Group 3" },
        { id: "upsc-4", name: "Group 4" },
      ],
    },
    {
      id: "cat-appsc",
      name: "APPSC",
      subcategories: [
        { id: "appsc-1", name: "Group 1" },
        { id: "appsc-2", name: "Group 2" },
        { id: "appsc-3", name: "Group 3" },
        { id: "appsc-4", name: "Group 4" },
      ],
    },
    {
      id: "cat-tspsc",
      name: "TSPSC",
      subcategories: [
        { id: "tspsc-1", name: "Group 1" },
        { id: "tspsc-2", name: "Group 2" },
        { id: "tspsc-3", name: "Group 3" },
        { id: "tspsc-4", name: "Group 4" },
      ],
    },
    {
      id: "cat-police",
      name: "Police",
      subcategories: [
        { id: "pol-1", name: "AP SI" },
        { id: "pol-2", name: "AP Constable" },
        { id: "pol-3", name: "TS SI" },
        { id: "pol-4", name: "TS Constable" },
      ],
    },
    {
      id: "cat-ssc",
      name: "SSC",
      subcategories: [
        { id: "ssc-1", name: "CGL" },
        { id: "ssc-2", name: "CHSL" },
      ],
    },
  ];

  const list =
    Array.isArray(categories) && categories.length
      ? categories
      : demoCategories;

  return (
    <div className={styles.pageWrap}>
      <div className={styles.box}>
        <div className={styles.gridWrap}>
          {list.map((cat) => (
            <div key={cat.id} className={styles.columnSlot}>
              {/* Special left column rendering */}
              {cat.special === "leftOnly" ? (
                <div className={styles.leftOnly}>
                  <button
                    className={styles.leftAdd}
                    onClick={() =>
                      dispatch({ type: "ADD_SUB_SPECIAL", payload: cat })
                    }
                  >
                    + Add Sub Category
                  </button>
                </div>
              ) : (
                <CategoryColumn
                  category={cat}
                  onOpen={(it) => dispatch({ type: "OPEN_MODAL", payload: it })}
                  onAddSub={(c) =>
                    dispatch({ type: "SHOW_ADD_SUB", payload: c })
                  }
                  onEdit={(it) => dispatch({ type: "EDIT_ITEM", payload: it })}
                  onDelete={(it) =>
                    dispatch({ type: "DELETE_ITEM", payload: it })
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.footerRow}>
          <button
            className={styles.addCategoryBtn}
            onClick={() => dispatch({ type: "ADD_CATEGORY" })}
          >
            <AiOutlinePlus className={styles.plusIcon} />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOnlineCoursesPage;
