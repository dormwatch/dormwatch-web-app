import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { fetchUserProfile } from "../services/problemsApi";

// We define a simple fallback preloader to avoid complex dependencies, 
// or we can import the existing Preloader if it's available.
// Since we are migrating, we will use a simple inline brutalist preloader.
const Preloader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="text-stone-500 font-bold uppercase tracking-widest text-xs animate-pulse">
      Завантаження...
    </div>
  </div>
);

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireStudent?: boolean;
  blockAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin, requireStudent, blockAdmin }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile()
      .then((data: any) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Preloader />;
  }

  const isAdminUser =
    user?.role &&
    ["admin", "адміністратор"].includes(
      (user.role.role_name || "").toLowerCase()
    );

  // If user is not logged in, they can't access protected routes
  if (!user && (requireAdmin || requireStudent)) {
    return <Navigate to="/account" replace />;
  }

  if (requireAdmin && !isAdminUser) {
    // Non-admin trying to access admin route
    return <Navigate to="/" replace />;
  }

  if (requireStudent && isAdminUser) {
    // Admin trying to access student route
    return <Navigate to="/admin" replace />;
  }

  if (blockAdmin && isAdminUser) {
    // Admin trying to access a blocked public/student route
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
