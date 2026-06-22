import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { MobileBottomNav } from "./components/layout/MobileNav";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PageLoader from "./components/common/PageLoader";
import FloatingContact from "./components/common/FloatingContact";
import PwaInstallPrompt from "./components/common/PwaInstallPrompt";
import ProtectedRoute from "./admin/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const MinistriesPage = lazy(() => import("./pages/MinistriesPage"));
const TribalOutreachPage = lazy(() => import("./pages/TribalOutreachPage"));
const ChildrensMinistryPage = lazy(() => import("./pages/ChildrensMinistryPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PortfolioKranthi = lazy(() => import("./pages/PortfolioKranthi"));
const PortfolioPrasanth = lazy(() => import("./pages/PortfolioPrasanth"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminHome = lazy(() => import("./admin/pages/AdminHome"));
const AdminPages = lazy(() => import("./admin/pages/AdminPages"));
const AdminGallery = lazy(() => import("./admin/pages/AdminGallery"));
const AdminFestivalBanner = lazy(() => import("./admin/pages/AdminFestivalBanner"));
const AdminChatbot = lazy(() => import("./admin/pages/AdminChatbot"));
const AdminMessages = lazy(() => import("./admin/pages/AdminMessages"));
const AdminAnalytics = lazy(() => import("./admin/pages/AdminAnalytics"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));

function PublicLayout({ children }) {
  return (
    <>
      <PageLoader />
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
      <MobileBottomNav />
      <ChatbotWidget />
      <FloatingContact />
      <PwaInstallPrompt />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ContentProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner fullPage />}>
              <Routes>
                <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
                <Route path="/ministries" element={<PublicLayout><MinistriesPage /></PublicLayout>} />
                <Route path="/tribal-outreach" element={<PublicLayout><TribalOutreachPage /></PublicLayout>} />
                <Route path="/childrens-ministry" element={<PublicLayout><ChildrensMinistryPage /></PublicLayout>} />
                <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                <Route path="/portfolio/kranthi" element={<PortfolioKranthi />} />
                <Route path="/portfolio/prasanth" element={<PortfolioPrasanth />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminHome />} />
                  <Route path="pages" element={<AdminPages />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="banner" element={<AdminFestivalBanner />} />
                  <Route path="chatbot" element={<AdminChatbot />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
                <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
              </Routes>
            </Suspense>
          </Router>
        </ContentProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
