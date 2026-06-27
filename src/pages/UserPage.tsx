import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, BellOff } from "lucide-react";
import { 
  fetchMyProblems, 
  fetchUserProfile, 
  CATEGORY_LABELS 
} from "../services/problemsApi";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [data, user] = await Promise.all([
           fetchMyProblems(),
           fetchUserProfile().catch(() => null)
        ]);
        if (!alive) return;
        setProblems(Array.isArray(data) ? data : []);
        setCurrentUser(user);
      } catch (e) {
        console.error("Failed to fetch user problems", e);
      } finally {
        if (alive) setLoading(false);
      }
    };

    loadData();
    window.addEventListener('profileUpdated', loadData);
    return () => { 
      alive = false; 
      window.removeEventListener('profileUpdated', loadData);
    };
  }, []);

  const visible = problems
    .slice()
    .filter(p => {
      if (activeTab === "active") {
        return p.status !== "resolved" && p.status !== "rejected";
      } else {
        return p.status === "resolved" || p.status === "rejected";
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Loading...</div>;

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-stone-50 mb-2">
          Hello, {currentUser?.first_name || "User"}!
        </h1>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {currentUser?.place?.place_name || "NO LOCATION SPECIFIED"}
        </p>
      </div>

      {/* Primary CTA */}
      <Link 
        to="/create-report"
        className="group flex items-center justify-between bg-blue-800 hover:bg-blue-900 transition-colors border border-blue-700 p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 border border-blue-600 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Report an Issue</h2>
            <p className="text-sm font-medium text-blue-200">Submit a new maintenance ticket for your room or common areas.</p>
          </div>
        </div>
        <ArrowRight className="w-8 h-8 text-white relative z-10 group-hover:translate-x-2 transition-transform hidden sm:block" />
        
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-700 to-transparent opacity-50 pointer-events-none" />
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Tickets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b border-stone-800 pb-2">
            <h3 className="text-xl font-bold text-stone-50">
              Active Tickets
            </h3>
            <button 
              onClick={() => setActiveTab(activeTab === "active" ? "history" : "active")}
              className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
            >
              {activeTab === "active" ? "View History" : "View Active"}
            </button>
          </div>

          <div className="space-y-6">
            {visible.length === 0 ? (
              <div className="p-12 border border-stone-800 border-dashed text-center">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">No tickets found.</p>
              </div>
            ) : (
              visible.map((p) => {
                const isPending = p.status === "pending";
                const isResolved = p.status === "resolved";
                const isRejected = p.status === "rejected";
                const isInProgress = p.status === "approved" || (!isPending && !isResolved && !isRejected);

                return (
                  <div key={p.id} className="bg-stone-900 border border-stone-800 p-6 sm:p-8 hover:border-stone-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                        <span>{(CATEGORY_LABELS[p.category] || p.category || "OTHER").toUpperCase()}</span>
                        <span className="w-1 h-1 bg-stone-600 rounded-full"></span>
                        <span>{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
                        isPending ? 'text-yellow-500 border-yellow-700/50 bg-yellow-900/30' :
                        isInProgress ? 'text-blue-500 border-blue-700/50 bg-blue-900/30' :
                        isResolved ? 'text-green-500 border-green-700/50 bg-green-900/30' :
                        'text-stone-500 border-stone-800 bg-stone-800/50'
                      }`}>
                        {isPending ? 'PENDING' : isInProgress ? 'IN PROGRESS' : isResolved ? 'RESOLVED' : 'REJECTED'}
                      </span>
                      {p.priority && (
                        <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
                          p.priority === 'critical' ? 'text-red-500 border-red-700/50 bg-red-900/30' :
                          p.priority === 'high' ? 'text-orange-500 border-orange-700/50 bg-orange-900/30' :
                          p.priority === 'low' ? 'text-green-500 border-green-700/50 bg-green-900/30' :
                          'text-amber-500 border-amber-700/50 bg-amber-900/30'
                        }`}>
                          {p.priority}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-stone-50 mb-2">
                      {p.title || "Untitled Issue"}
                    </h3>
                    <p className="text-sm text-stone-400 mb-8 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-6 border-t border-dashed border-stone-800 space-y-3 mt-4">
                      <div className="flex text-[9px] font-bold uppercase tracking-widest">
                        <span className="w-1/3 text-left text-blue-500">SUBMITTED</span>
                        <span className={`w-1/3 text-center ${isInProgress || isResolved ? "text-stone-400" : "text-stone-700"}`}>IN PROGRESS</span>
                        <span className={`w-1/3 text-right ${isResolved ? "text-stone-400" : "text-stone-700"}`}>RESOLVED</span>
                      </div>
                      <div className="flex h-1.5 gap-1">
                        {/* Submitted segment */}
                        <div className="flex-1 bg-blue-600"></div>
                        {/* In Progress segment */}
                        <div className={`flex-1 ${isInProgress || isResolved ? "bg-blue-600" : "bg-stone-800"}`}></div>
                        {/* Resolved segment */}
                        <div className={`flex-1 ${isResolved ? "bg-blue-600" : "bg-stone-800"}`}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Community Board */}
        <div>
          <h3 className="text-lg font-bold text-stone-50 mb-6 border-b border-stone-800 pb-2">Community Board</h3>
          <div className="border border-stone-800 border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-16 h-16 border border-stone-800 flex items-center justify-center mb-6 text-stone-600">
              <BellOff className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-50 mb-2">No Announcements</h4>
            <p className="text-sm font-medium text-stone-500">
              Your board is clear. We'll post scheduled maintenance or building updates here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
