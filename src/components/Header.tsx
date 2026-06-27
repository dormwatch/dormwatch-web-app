import { Link, useLocation } from "react-router-dom";
import { Building2, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-stone-800 border-b border-stone-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-indigo-500 font-bold text-xl tracking-tight cursor-pointer">
            <Building2 className="w-6 h-6" />
            <span>Dormwatch</span>
          </Link>
          
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className={`px-4 py-5 text-sm font-semibold rounded-none transition-colors border-b-2 ${
                currentPath === "/"
                  ? "border-indigo-500 text-stone-50 bg-stone-700/30"
                  : "border-transparent text-stone-400 hover:text-stone-50 hover:bg-stone-700/30"
              }`}
            >
              Головна
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-5 text-sm font-semibold rounded-none transition-colors border-b-2 ${
                currentPath === "/dashboard"
                  ? "border-indigo-500 text-stone-50 bg-stone-700/30"
                  : "border-transparent text-stone-400 hover:text-stone-50 hover:bg-stone-700/30"
              }`}
            >
              Дашборд
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-5 text-sm font-semibold rounded-none transition-colors border-b-2 ${
                currentPath === "/admin"
                  ? "border-indigo-500 text-stone-50 bg-stone-700/30"
                  : "border-transparent text-stone-400 hover:text-stone-50 hover:bg-stone-700/30"
              }`}
            >
              Комендант-центр
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/create-report"
            className="hidden sm:flex items-center gap-2 bg-indigo-800 hover:bg-indigo-900 border border-indigo-700 text-white px-4 py-2 rounded-none text-sm font-semibold transition-colors"
          >
            + Створити заявку
          </Link>

          {/* User Profile Dropdown Placeholder */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-stone-400 hover:text-stone-50 transition-colors hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <Link to="/account" className="flex items-center gap-2 pl-2 sm:border-l sm:border-stone-700 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-none bg-stone-700 flex items-center justify-center text-stone-300 font-semibold text-sm">
                ОК
              </div>
              <ChevronDown className="w-4 h-4 text-stone-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
