import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import CreateReportPage from "./pages/CreateReportPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import StudentLayout from "./components/StudentLayout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public / Student routes wrapped in StudentLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute blockAdmin>
            <StudentLayout>
              <HomePage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute blockAdmin>
            <StudentLayout>
              <UserPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute blockAdmin>
            <StudentLayout>
              <AccountPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-report"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <CreateReportPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes wrapped in AdminLayout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <DashboardPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminPage />
          </AdminLayout>
        }
      />

      <Route path="*" element={<div className="p-8 font-bold text-stone-400">404 — сторінку не знайдено</div>} />
    </Routes>
  );
}

export default App;
