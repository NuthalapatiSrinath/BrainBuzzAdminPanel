import React from "react";
import { Routes, Route } from "react-router-dom";

// Scroll To Top Component
import ScrollToTop from "../components/ScrollToTop";

// Layout
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

// Core pages
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import ContactUs from "../pages/ContactUs/ContactUs";

// ========================
// PAYMENT FLOW PAGES
// ========================
import PaymentPage from "../pages/PaymentPages/PaymentPage/PaymentPage";
import PaymentAddressPage from "../pages/PaymentPages/PaymentAddressPage/PaymentAddressPage";
import PaymentMethodPage from "../pages/PaymentPages/PaymentMethodPage/PaymentMethodPage";
import PaymentSuccessPage from "../pages/PaymentPages/PaymentSuccessPage/PaymentSuccessPage";
import InvoicePage from "../pages/PaymentPages/InvoicePage/InvoicePage";

// ========================
// CURRENT AFFAIRS FLOW
// ========================
import CurrentAffairsPage from "../pages/CurrentAffairs/CurrentAffairsPage/CurrentAffairsPage";
import CurrentAffairsSubcategories from "../pages/CurrentAffairs/CurrentAffairsSubcategories/CurrentAffairsSubcategories";
import CurrentAffairsArticlePage from "../pages/CurrentAffairs/CurrentAffairsArticlePage/CurrentAffairsArticlePage";
import CurrentAffairsArticlesPage from "../pages/CurrentAffairs/CurrentAffairsArticlesPage/CurrentAffairsArticlesPage";

// ========================
// DAILY QUIZZES FLOW
// ========================
import DailyQuizzesPage from "../pages/DailyQuizzes/DailyQuizzesPage/DailyQuizzesPage";
import DailyQuizzesSubcategories from "../pages/DailyQuizzes/DailyQuizzesSubcategories/DailyQuizzesSubcategories";
import QuizzesListPage from "../pages/DailyQuizzes/QuizzesListPage/QuizzesListPage";
import QuizDescriptionPage from "../pages/DailyQuizzes/QuizDescriptionPage/QuizDescriptionPage";
import QuizPlayPage from "../pages/DailyQuizzes/QuizPlayPage/QuizPlayPage";
import QuizResultPage from "../pages/DailyQuizzes/QuizResultPage/QuizResultPage";
import QuizCorrectAnswersPage from "../pages/DailyQuizzes/QuizCorrectAnswersPage/QuizCorrectAnswersPage";

// ========================
// EBOOKS FLOW (PUBLICATIONS)
// ========================
import EbooksPage from "../pages/Ebooks/EbooksPage/EbooksPage";
import EbooksSubcategories from "../pages/Ebooks/EbooksSubcategories/EbooksSubcategories";
import PublicationsPage from "../pages/Ebooks/PublicationsPage/PublicationsPage";
import BookDetailPage from "../pages/Ebooks/BookDetailPage/BookDetailPage";

// ========================
// PREVIOUS PAPERS FLOW
// ========================
import PreviousQuestionPapers from "../pages/PreviousQuesitonPapers/PreviousQuestionPapers/PreviousQuestionPapers";
import PreviousPapersSubcategories from "../pages/PreviousQuesitonPapers/PreviousPapersSubcategories/PreviousPapersSubcategories";
import CategoryPublications from "../sections/CategoryPublications/CategoryPublications";
import PaperDetail from "../sections/CategoryPublications/PaperDetail";

// ========================
// ONLINE COURSES FLOW
// ========================
import OnlineCoursesPage from "../pages/OnlineCourses/OnlineCoursesPage/OnlineCoursesPage";
import OnlineCoursesAllPage from "../pages/OnlineCourses/OnlineCoursesAllPage/OnlineCoursesAllPage";
import OnlineCoursesSubcategories from "../pages/OnlineCourses/OnlineCoursesSubcategories/OnlineCoursesSubcategories";
import OnlineCoursesListPage from "../pages/OnlineCourses/OnlineCoursesListPage/OnlineCoursesListPage";
import CourseDescriptionPage from "../pages/OnlineCourses/CourseDescriptionPage/CourseDescriptionPage";
import CourseVideoPlayerPage from "../pages/OnlineCourses/CourseVideoPlayerPage/CourseVideoPlayerPage";
import CoursesDataPage from "../pages/OnlineCourses/CoursesDataPage/CoursesDataPage";

// ========================
// LIVE CLASSES FLOW
// ========================
import LiveClasses from "../pages/LiveClasses/LiveClasses";
import AllLiveClassesPage from "../pages/LiveClasses/AllLiveClassesPage/AllLiveClassesPage";
import LiveClassesSubcategories from "../pages/LiveClasses/LiveClassesSubcategories/LiveClassesSubcategories";
import SubcategoryClassesPage from "../pages/LiveClasses/SubcategoryClassesPage/SubcategoryClassesPage";

// ========================
// TEST SERIES FLOW
// ========================
import TestSeriesPage from "../pages/TestSeries/TestSeriesPage/TestSeriesPage";
import TestSeriesListPage from "../pages/TestSeries/TestSeriesListPage/TestSeriesListPage";
import TestSeriesDescriptionPage from "../pages/TestSeries/TestSeriesDescriptionPage/TestSeriesDescriptionPage";
import TestInstructionsPage from "../pages/TestSeries/TestInstructionsPage/TestInstructionsPage";
import TestPlayPage from "../pages/TestSeries/TestPlayPage/TestPlayPage";
import TestResultPage from "../pages/TestSeries/TestResultPage/TestResultPage";

// User Panel Pages
import MyCoursesPage from "../pages/TopBar/TopbarPanelPages/MyCoursesPage/MyCoursesPage";
import MyTestSeries from "../pages/TopBar/TopbarPanelPages/MyTestSeries/MyTestSeries";
import MyEbooksPage from "../pages/TopBar/TopbarPanelPages/MyEbooksPage/MyEbooksPage";
import ResetPasswordModal from "../modals/ResetPasswordModal/ResetPasswordModal";
import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage";

// --- ADMIN IMPORTS ---
import AdminMainPage from "../pages/Admin/AdminMainPage/AdminMainPage";
import AdminOnlineCoursesPage from "../pages/Admin/AdminOnlineCoursesPage/AdminOnlineCoursesPage";

// --- Placeholder Component ---
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
    <h2>{title}</h2>
    <p>This form/page is under development.</p>
  </div>
);

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Home */}
          <Route path="reset-password" element={<ResetPasswordModal />} />
          <Route index element={<HomePage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />

          {/* Payment */}
          <Route path="/buy-now/:buyNowId" element={<PaymentPage />} />
          <Route
            path="/payment-address/:buyNowId"
            element={<PaymentAddressPage />}
          />
          <Route
            path="/payment-method/:buyNowId"
            element={<PaymentMethodPage />}
          />
          <Route
            path="/payment-success/:buyNowId"
            element={<PaymentSuccessPage />}
          />
          <Route path="/invoice/:buyNowId" element={<InvoicePage />} />

          {/* User Profile */}
          <Route path="/mycourses" element={<MyCoursesPage />} />
          <Route path="/coursesdatapage" element={<CoursesDataPage />} />
          <Route path="/mytestseries" element={<MyTestSeries />} />
          <Route path="/myebooks" element={<MyEbooksPage />} />

          {/* Online Courses */}
          <Route path="online-courses" element={<OnlineCoursesPage />} />
          <Route path="online-courses/all" element={<OnlineCoursesAllPage />} />
          <Route
            path="online-courses/:category"
            element={<OnlineCoursesSubcategories />}
          />
          <Route
            path="online-courses/:category/:subcategory"
            element={<OnlineCoursesListPage />}
          />
          <Route
            path="online-courses/:category/:subcategory/:courseId/:tab?"
            element={<CourseDescriptionPage />}
          />
          <Route
            path="online-courses/:category/:subcategory/:courseId/video/:videoId"
            element={<CourseVideoPlayerPage />}
          />

          {/* Live Classes */}
          <Route path="/liveclasses" element={<LiveClasses />} />
          <Route path="liveclasses/all" element={<AllLiveClassesPage />} />
          <Route
            path="/liveclasses/:category"
            element={<LiveClassesSubcategories />}
          />
          <Route
            path="/liveclasses/:category/:subcategory"
            element={<SubcategoryClassesPage />}
          />

          {/* Current Affairs */}
          <Route path="currentaffairs" element={<CurrentAffairsPage />} />
          <Route
            path="currentaffairs/:category"
            element={<CurrentAffairsSubcategories />}
          />
          <Route
            path="currentaffairs/:category/:subId"
            element={<CurrentAffairsArticlesPage />}
          />
          <Route
            path="currentaffairs/:category/:subId/:articleId"
            element={<CurrentAffairsArticlePage />}
          />

          {/* Daily Quizzes */}
          <Route path="dailyquizzes" element={<DailyQuizzesPage />} />
          <Route
            path="dailyquizzes/:category"
            element={<DailyQuizzesSubcategories />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory"
            element={<QuizzesListPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId"
            element={<QuizDescriptionPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/play"
            element={<QuizPlayPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/result"
            element={<QuizResultPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/review"
            element={<QuizCorrectAnswersPage />}
          />

          {/* E-books */}
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="ebooks/:category" element={<EbooksSubcategories />} />
          <Route
            path="ebooks/:category/:subcategory"
            element={<PublicationsPage />}
          />
          <Route
            path="ebooks/:category/:subcategory/:id/:tab?"
            element={<BookDetailPage />}
          />

          {/* Previous Papers */}
          <Route path="previous-papers" element={<PreviousQuestionPapers />} />
          <Route
            path="previous-papers/:category"
            element={<PreviousPapersSubcategories />}
          />
          <Route
            path="previous-papers/:category/:subcategory"
            element={<CategoryPublications />}
          />
          <Route
            path="previous-papers/:category/:subcategory/:paperId"
            element={<PaperDetail />}
          />

          {/* Test Series */}
          <Route path="test-series" element={<TestSeriesPage />} />
          <Route
            path="test-series/:category"
            element={<TestSeriesListPage />}
          />
          <Route
            path="test-series/:category/:seriesId/:tab?"
            element={<TestSeriesDescriptionPage />}
          />
          <Route
            path="test-series/:category/:seriesId/instructions"
            element={<TestInstructionsPage />}
          />
          <Route
            path="test-series/:category/:seriesId/play/:testId"
            element={<TestPlayPage />}
          />
          <Route
            path="test-series/:category/:seriesId/result/:testId"
            element={<TestResultPage />}
          />

          {/* About & Contact */}
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="contactus" element={<ContactUs />} />

          {/* --- ADMIN PANEL ROUTES --- */}
          <Route path="/admin/content" element={<AdminMainPage />}>
            {/* ADD ROUTES */}
            <Route index element={<AdminOnlineCoursesPage />} />
            <Route
              path="add/online-course"
              element={<AdminOnlineCoursesPage />}
            />
            <Route
              path="add/test-series"
              element={<PlaceholderPage title="Add Test Series" />}
            />
            <Route
              path="add/daily-quiz"
              element={<PlaceholderPage title="Add Daily Quiz" />}
            />
            <Route
              path="add/current-affairs"
              element={<PlaceholderPage title="Add Current Affairs" />}
            />
            <Route
              path="add/publication"
              element={<PlaceholderPage title="Add Publication" />}
            />
            <Route
              path="add/previous-paper"
              element={<PlaceholderPage title="Add Previous Paper" />}
            />

            {/* UPDATE ROUTES */}
            <Route
              path="update/online-courses"
              element={<PlaceholderPage title="Update Online Courses" />}
            />
            <Route
              path="update/test-series"
              element={<PlaceholderPage title="Update Test Series" />}
            />
            <Route
              path="update/daily-quizzes"
              element={<PlaceholderPage title="Update Daily Quizzes" />}
            />
            <Route
              path="update/current-affairs"
              element={<PlaceholderPage title="Update Current Affairs" />}
            />
            <Route
              path="update/publications"
              element={<PlaceholderPage title="Update Publications" />}
            />
            <Route
              path="update/previous-papers"
              element={<PlaceholderPage title="Update Previous Papers" />}
            />
            <Route
              path="update/live-classes"
              element={<PlaceholderPage title="Update Live Classes" />}
            />
            <Route
              path="update/banners"
              element={<PlaceholderPage title="Update Banners" />}
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 40 }}>404 Not Found</div>}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
