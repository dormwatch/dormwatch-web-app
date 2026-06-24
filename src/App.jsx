// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import CreateReportPage from "./pages/CreateReportPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />

          {/* All routes are now public - Clerk authentication commented out */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/create-report" element={<CreateReportPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<div className="p-8">404 — сторінку не знайдено</div>} />

          {/* Protected routes - COMMENTED OUT
          <Route
            path="/admin"
            element={
              <>
                <SignedIn>
                  <AdminPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/create-report"
            element={
              <>
                <SignedIn>
                  <CreateReportPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
