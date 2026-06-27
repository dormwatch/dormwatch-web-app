import { Link } from "react-router-dom";
import { Building2, Bell, ChevronDown } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/problemsApi";
import ProfileModal from "./ProfileModal";

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const [initials, setInitials] = useState("JD");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const loadUser = () => {
    fetchUserProfile().then((user: any) => {
      if (user) {
        setUserProfile(user);
        if (user.first_name && user.last_name) {
          setInitials(`${user.first_name[0]}${user.last_name[0]}`.toUpperCase());
        }
      }
    }).catch(() => {});
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-stone-900 border-b border-stone-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-500 font-bold text-xl tracking-tight cursor-pointer hover:text-blue-400 transition-colors">
            <Building2 className="w-6 h-6" />
            <span>Dormwatch</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {userProfile?.role && ["admin", "адміністратор"].includes((userProfile.role.role_name || "").toLowerCase()) && (
              <Link to="/admin" className="text-[10px] font-bold text-stone-400 hover:text-blue-400 uppercase tracking-widest transition-colors hidden sm:block mr-2">
                Admin Panel
              </Link>
            )}

            <button className="p-2 text-stone-400 hover:text-stone-50 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-none border border-stone-900"></span>
            </button>
            
            <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center gap-2 pl-4 border-l border-stone-700 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-none bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 font-bold text-xs">
                {initials}
              </div>
              <ChevronDown className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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

export default StudentLayout;
