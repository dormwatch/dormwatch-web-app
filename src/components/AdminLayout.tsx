import { Link, useLocation } from "react-router-dom";
import { Building2, LayoutDashboard, Users, FileText, Megaphone, Settings } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/problemsApi";
import ProfileModal from "./ProfileModal";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const loadUser = () => {
    fetchUserProfile().then((user: any) => {
      if (user) setUserProfile(user);
    }).catch(() => {});
  };

  useEffect(() => {
    loadUser();
  }, []);

  const navItems = [
    { name: "Admin Overview", path: "/admin?tab=overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Residents", path: "#", icon: <Users className="w-5 h-5" /> },
    { name: "All Complaints", path: "/admin?tab=complaints", icon: <FileText className="w-5 h-5" /> },
    { name: "Announcements", path: "#", icon: <Megaphone className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-stone-900 bg-dot-grid relative">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 border-r border-stone-700 flex flex-col md:sticky md:top-0 md:h-screen z-40 relative">
        
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-stone-700">
          <Link to="/admin" className="flex items-center gap-3 text-blue-500 font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
            <Building2 className="w-6 h-6" />
            <span>Dormwatch</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isOverviewActive = currentPath === item.path.split('?')[0] && !location.search && item.path.includes('tab=overview');
            const isComplaintsOrTickets = item.path.includes('tab=complaints') && (location.search === '?tab=complaints' || location.search === '?tab=tickets');
            const isActive = currentPath + location.search === item.path || isOverviewActive || isComplaintsOrTickets;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all border-l-4 ${
                  isActive
                    ? "border-blue-500 bg-stone-800 text-stone-50"
                    : "border-transparent text-stone-400 hover:bg-stone-800/50 hover:text-stone-300"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-stone-700 space-y-4">
          <button onClick={() => setIsProfileModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-stone-400 hover:text-stone-300 hover:bg-stone-800/50 transition-colors border-l-4 border-transparent text-left">
            <Settings className="w-5 h-5" />
            Settings
          </button>

          <button onClick={() => setIsProfileModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-800/50 transition-colors text-left">
            <div className="w-10 h-10 bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 font-bold text-sm shrink-0">
              {userProfile ? `${userProfile.first_name?.[0] || ""}${userProfile.last_name?.[0] || ""}`.toUpperCase() : "AD"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-stone-50 truncate">
                {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "Admin"}
              </span>
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-widest truncate">
                {userProfile?.place?.place_name || "Headquarters"}
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        user={userProfile} 
        onProfileUpdate={loadUser} 
      />
    </div>
  );
};

export default AdminLayout;
