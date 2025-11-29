// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Admin Wrapper Layout
// import AdminMainPage from "../pages/Admin/AdminMainPage/AdminMainPage";

// // Admin Content Pages
// import AdminOnlineCoursesPage from "../pages/Admin/AdminOnlineCoursesPage/AdminOnlineCoursesPage";

// // Placeholder for pages not yet created
// const PlaceholderPage = ({ title }) => (
//   <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
//     <h2>{title}</h2>
//     <p>This form/page is under development.</p>
//   </div>
// );

// export default function AdminRoutes() {
//   return (
//     <Routes>
//       {/* Parent Route: /admin/content */}
//       <Route path="/" element={<AdminMainPage />}>
//         {/* === ADD ROUTES === */}
//         {/* Default content when landing on /admin/content usually redirects or shows first tab */}
//         <Route index element={<AdminOnlineCoursesPage />} />

//         {/* Specific Add Content Pages */}
//         <Route path="add/online-course" element={<AdminOnlineCoursesPage />} />
//         <Route
//           path="add/test-series"
//           element={<PlaceholderPage title="Add Test Series" />}
//         />
//         <Route
//           path="add/daily-quiz"
//           element={<PlaceholderPage title="Add Daily Quiz" />}
//         />
//         <Route
//           path="add/current-affairs"
//           element={<PlaceholderPage title="Add Current Affairs" />}
//         />
//         <Route
//           path="add/publication"
//           element={<PlaceholderPage title="Add Publication" />}
//         />
//         <Route
//           path="add/previous-paper"
//           element={<PlaceholderPage title="Add Previous Paper" />}
//         />

//         {/* === UPDATE ROUTES === */}
//         <Route
//           path="update/online-courses"
//           element={<PlaceholderPage title="Update Online Courses List" />}
//         />
//         <Route
//           path="update/test-series"
//           element={<PlaceholderPage title="Update Test Series List" />}
//         />
//         <Route
//           path="update/daily-quizzes"
//           element={<PlaceholderPage title="Update Daily Quizzes List" />}
//         />
//         <Route
//           path="update/current-affairs"
//           element={<PlaceholderPage title="Update Current Affairs List" />}
//         />
//         <Route
//           path="update/publications"
//           element={<PlaceholderPage title="Update Publications List" />}
//         />
//         <Route
//           path="update/previous-papers"
//           element={<PlaceholderPage title="Update Previous Papers List" />}
//         />
//         <Route
//           path="update/live-classes"
//           element={<PlaceholderPage title="Update Live Classes List" />}
//         />
//         <Route
//           path="update/banners"
//           element={<PlaceholderPage title="Update Banners List" />}
//         />
//       </Route>
//     </Routes>
//   );
// }
