// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-indigo-900">
              DormWatch
            </span>
          </Link>
          <nav className="hidden md:flex gap-1">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPath === "/"
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-slate-100"
              }`}
            >
              Головна
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPath === "/dashboard"
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-slate-100"
              }`}
            >
              Дашборд
            </Link>
            {/* Admin link now always visible - Clerk authentication commented out */}
            <Link
              to="/admin"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPath === "/admin"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              Комендант-центр
            </Link>
            {/* COMMENTED OUT - Clerk SignedIn wrapper
            <SignedIn>
              <Link
                to="/admin"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPath === "/admin"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Комендант-центр
              </Link>
            </SignedIn>
            */}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Create report button now always visible - Clerk authentication commented out */}
          <Link
            to="/create-report"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            + Створити заявку
          </Link>
          {/* User account section */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">
                Олексій Коваленко
              </p>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">
                Гуртожиток №4, Кімн. 512
              </p>
            </div>
            <Link to="/account">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-200 transition-all">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=DormUser"
                  alt="Аватар студента"
                />
              </div>
            </Link>
          </div>

          {/* COMMENTED OUT - Clerk authentication components
          <SignedIn>
            <Link
              to="/create-report"
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              + Створити заявку
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                Увійти
              </button>
            </SignInButton>
          </SignedOut>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
