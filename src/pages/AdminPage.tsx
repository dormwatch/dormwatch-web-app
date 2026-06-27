import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, Clock, Wrench, CheckCircle2, Edit2, Plus } from "lucide-react";
import { 
  fetchAllComplaints,
  updateComplaintStatus, 
  deleteProblem,
  fetchUserProfile,
  CATEGORY_LABELS,
  fetchTickets,
  fetchEmployees,
  createTicket,
  updateTicket
} from "../services/problemsApi";
import { resolveImageUrl } from "../services/imageUtils";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "overview";
  
  const [activeTab, setActiveTab] = useState(initialTab); // overview, complaints, tickets

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const [items, setItems] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters for complaints
  const [complaintSearch, setComplaintSearch] = useState("");
  const [complaintStatus, setComplaintStatus] = useState("pending");
  const [complaintCategory, setComplaintCategory] = useState("all");
  const [complaintPriority, setComplaintPriority] = useState("all");
  const [complaintCorps, setComplaintCorps] = useState("all");

  // Filters for tickets
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketWorker, setTicketWorker] = useState("all");
  const [ticketPriority, setTicketPriority] = useState("all");

  // Ticket Modal State
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedComplaintForTicket, setSelectedComplaintForTicket] = useState<any>(null);
  const [ticketEmployee, setTicketEmployee] = useState("");
  const [ticketDeadline, setTicketDeadline] = useState("");
  const [editingTicketId, setEditingTicketId] = useState<number | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await fetchUserProfile();
        if (!user || !user.role || !["admin", "адміністратор"].includes((user.role.role_name || "").toLowerCase())) {
          navigate("/");
        }
      } catch (e) {
        console.warn(e);
      }
    }
    checkAuth();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allComplaints, fetchedTickets, fetchedEmployees] = await Promise.all([
        fetchAllComplaints({}),
        fetchTickets({}),
        fetchEmployees()
      ]);
      setItems(allComplaints || []);
      setTickets(fetchedTickets || []);
      setEmployees(fetchedEmployees || []);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const pendingCount = items.filter(i => i.status === "pending").length;
  const inProgressCount = items.filter(i => i.status === "approved" || i.status === "published").length;
  const resolvedCount = items.filter(i => i.status === "resolved").length;

  const handleStatusChange = async (id: number, status: string) => {
    if (!confirm(`Change status to ${status}?`)) return;
    try {
      await updateComplaintStatus(id, status);
      loadData();
    } catch(e) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await deleteProblem(id);
      loadData();
    } catch(e) {
      alert("Failed to delete complaint");
    }
  };

  const getStatusBadge = (status: string) => {
    const s = String(status || "new").toLowerCase();
    if (s === "pending") return <span className="px-2 py-1 text-[9px] font-bold border border-yellow-700/50 text-yellow-500 uppercase tracking-widest bg-yellow-900/30">PENDING</span>;
    if (s === "approved" || s === "published") return <span className="px-2 py-1 text-[9px] font-bold border border-blue-700/50 text-blue-500 uppercase tracking-widest bg-blue-900/30">PUBLISHED</span>;
    if (s === "resolved") return <span className="px-2 py-1 text-[9px] font-bold border border-green-700/50 text-green-500 uppercase tracking-widest bg-green-900/30">RESOLVED</span>;
    return <span className="px-2 py-1 text-[9px] font-bold border border-red-700/50 text-red-500 uppercase tracking-widest bg-red-900/30">REJECTED</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const p = String(priority || "medium").toLowerCase();
    if (p === "critical") return <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-pink-900/30 text-pink-500 border border-pink-800">CRITICAL</span>;
    if (p === "high") return <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-red-900/30 text-red-500 border border-red-800">HIGH</span>;
    if (p === "low") return <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-green-900/30 text-green-500 border border-green-800">LOW</span>;
    return <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-orange-900/30 text-orange-500 border border-orange-800">MEDIUM</span>;
  };

  const filteredComplaints = useMemo(() => {
    return items.filter(p => {
      const s = p.status === 'published' ? 'approved' : p.status === 'denied' ? 'rejected' : p.status;
      if (complaintStatus !== "all" && s !== complaintStatus) return false;
      if (complaintCategory !== "all" && p.category !== complaintCategory) return false;
      if (complaintPriority !== "all" && p.priority !== complaintPriority) return false;
      if (complaintCorps !== "all" && String(p.building) !== complaintCorps) return false;
      if (complaintSearch) {
        const q = complaintSearch.toLowerCase();
        if (!p.title?.toLowerCase().includes(q) && !p.description?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [items, complaintStatus, complaintCategory, complaintPriority, complaintCorps, complaintSearch]);

  const filteredTicketsList = useMemo(() => {
    return items.filter(p => {
      if (ticketPriority !== "all" && p.priority !== ticketPriority) return false;
      if (ticketSearch) {
        const q = ticketSearch.toLowerCase();
        if (!p.title?.toLowerCase().includes(q) && !p.description?.toLowerCase().includes(q)) return false;
      }
      const ticket = tickets.find(t => t.complaint === p.id);
      if (ticketWorker !== "all") {
        if (!ticket) return false;
        const wId = String(ticket.user?.user || ticket.user || "");
        if (wId !== String(ticketWorker)) return false;
      }
      return true;
    });
  }, [items, tickets, ticketWorker, ticketPriority, ticketSearch]);

  const openTicketModal = (complaint: any) => {
    setSelectedComplaintForTicket(complaint);
    setTicketEmployee("");
    setTicketDeadline("");
    setEditingTicketId(null);
    setIsTicketModalOpen(true);
  };

  const openEditTicketModal = (complaint: any, ticket: any) => {
    setSelectedComplaintForTicket(complaint);
    setTicketEmployee(ticket.user?.user || ticket.user || "");
    setTicketDeadline(ticket.deadline ? new Date(ticket.deadline).toISOString().split('T')[0] : "");
    setEditingTicketId(ticket.ticket_id);
    setIsTicketModalOpen(true);
  };

  const handleSaveTicket = async () => {
    if (!ticketEmployee) return alert("Будь ласка, оберіть виконавця.");
    try {
      if (editingTicketId) {
        await updateTicket(editingTicketId, ticketEmployee, ticketDeadline || null);
      } else {
        await createTicket(selectedComplaintForTicket.id, ticketEmployee, ticketDeadline || null);
      }
      setIsTicketModalOpen(false);
      loadData();
    } catch (e) {
      alert("Помилка збереження тікету.");
    }
  };

  return (
    <div className="p-8 lg:p-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-bold text-stone-50">
          {activeTab === 'overview' ? 'Facility Overview' : activeTab === 'complaints' ? 'All Complaints' : 'Ticket Management'}
        </h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-stone-700 hover:bg-stone-800 transition-colors text-xs font-bold text-stone-300 uppercase tracking-widest">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button 
            onClick={() => navigate("?tab=tickets")}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 border border-orange-500 hover:bg-orange-700 transition-colors text-xs font-bold text-white uppercase tracking-widest shadow-[0_0_15px_rgba(234,88,12,0.3)]"
          >
            <Plus className="w-4 h-4" />
            New Work Order
          </button>
        </div>
      </div>
      {/* Tabs (Only visible for Complaints and Tickets) */}
      {(activeTab === 'complaints' || activeTab === 'tickets') && (
        <div className="flex border-b border-stone-800 overflow-x-auto">
          <button 
            onClick={() => navigate("?tab=complaints")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'complaints' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-stone-500 hover:text-stone-300'}`}
          >
            All Complaints
          </button>
          <button 
            onClick={() => navigate("?tab=tickets")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'tickets' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Ticket Management
          </button>
        </div>
      )}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-900 border border-stone-800 p-6 relative overflow-hidden group">
              <div className="flex items-center gap-2 text-stone-400 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Pending</span>
              </div>
              <div className="text-4xl font-bold text-stone-50 mb-2">{pendingCount}</div>
              {/* Fake Bar Chart */}
              <div className="absolute bottom-4 right-4 flex items-end gap-1 opacity-50">
                <div className="w-2 h-4 bg-stone-700"></div><div className="w-2 h-6 bg-stone-700"></div><div className="w-2 h-3 bg-stone-700"></div><div className="w-2 h-8 bg-stone-700"></div><div className="w-2 h-5 bg-stone-700"></div><div className="w-2 h-10 bg-yellow-600"></div>
              </div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-6 relative overflow-hidden group">
              <div className="flex items-center gap-2 text-stone-400 mb-4">
                <Wrench className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">In Progress</span>
              </div>
              <div className="text-4xl font-bold text-stone-50 mb-2">{inProgressCount}</div>
              {/* Fake Bar Chart */}
              <div className="absolute bottom-4 right-4 flex items-end gap-1 opacity-50">
                <div className="w-2 h-5 bg-stone-700"></div><div className="w-2 h-3 bg-stone-700"></div><div className="w-2 h-6 bg-stone-700"></div><div className="w-2 h-4 bg-stone-700"></div><div className="w-2 h-9 bg-stone-700"></div><div className="w-2 h-7 bg-orange-600"></div>
              </div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-6 relative overflow-hidden group">
              <div className="flex items-center gap-2 text-stone-400 mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Resolved</span>
              </div>
              <div className="text-4xl font-bold text-stone-50 mb-2">{resolvedCount}</div>
              {/* Fake Bar Chart */}
              <div className="absolute bottom-4 right-4 flex items-end gap-1 opacity-50">
                <div className="w-2 h-3 bg-stone-700"></div><div className="w-2 h-5 bg-stone-700"></div><div className="w-2 h-8 bg-stone-700"></div><div className="w-2 h-4 bg-stone-700"></div><div className="w-2 h-6 bg-stone-700"></div><div className="w-2 h-12 bg-green-600"></div>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800">
            <div className="flex justify-between items-center p-6 border-b border-stone-800">
              <h3 className="text-lg font-bold text-stone-50">Recent Complaints</h3>
              <button onClick={() => navigate("?tab=complaints")} className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/50">
                    <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Issue</th>
                    <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Category</th>
                    <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Date Submitted</th>
                    <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {items.slice(0, 5).map(p => {
                    const date = p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
                    return (
                      <tr key={p.id} className="hover:bg-stone-800/20 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-sm text-stone-50">{p.title || "Untitled"}</p>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-1 max-w-md">{p.description}</p>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{CATEGORY_LABELS[p.category] || p.category || "OTHER"}</span>
                        </td>
                        <td className="p-4 text-xs text-stone-400 font-medium">{date}</td>
                        <td className="p-4">
                          {p.status === 'pending' && <span className="px-2 py-1 text-[9px] font-bold border border-yellow-700/50 text-yellow-500 uppercase tracking-widest bg-yellow-900/10">PENDING</span>}
                          {(p.status === 'approved' || p.status === 'published') && <span className="px-2 py-1 text-[9px] font-bold border border-orange-700/50 text-orange-500 uppercase tracking-widest bg-orange-900/10">IN PROGRESS</span>}
                          {p.status === 'resolved' && <span className="px-2 py-1 text-[9px] font-bold border border-green-700/50 text-green-500 uppercase tracking-widest bg-green-900/10">RESOLVED</span>}
                          {(p.status === 'denied' || p.status === 'rejected') && <span className="px-2 py-1 text-[9px] font-bold border border-red-700/50 text-red-500 uppercase tracking-widest bg-red-900/10">REJECTED</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "complaints" && (
        <div className="grid lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
          {/* Filters Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-stone-900 border border-stone-800 p-6 space-y-6">
              <h3 className="text-sm font-bold text-stone-50 uppercase tracking-widest border-b border-stone-800 pb-2">Filters</h3>
              
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Search</label>
                <input 
                  type="text" 
                  value={complaintSearch}
                  onChange={(e) => setComplaintSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Status</label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "all", name: "All" },
                    { id: "pending", name: "Pending" },
                    { id: "approved", name: "Published" },
                    { id: "resolved", name: "Resolved" },
                    { id: "rejected", name: "Rejected" }
                  ].map(s => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="c_status" checked={complaintStatus === s.id} onChange={() => setComplaintStatus(s.id)} className="hidden" />
                      <div className={`w-3 h-3 border transition-colors ${complaintStatus === s.id ? 'bg-blue-500 border-blue-500' : 'border-stone-600 group-hover:border-stone-400'}`}></div>
                      <span className={`text-[11px] font-bold uppercase tracking-widest ${complaintStatus === s.id ? 'text-stone-50' : 'text-stone-500 group-hover:text-stone-300'}`}>{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Category</label>
                <select value={complaintCategory} onChange={(e) => setComplaintCategory(e.target.value)} className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-[11px] uppercase tracking-widest focus:outline-none focus:border-blue-500 appearance-none">
                  <option value="all">ALL</option>
                  <option value="plumbing">PLUMBING</option>
                  <option value="electricity">ELECTRICITY</option>
                  <option value="furniture">FURNITURE</option>
                  <option value="internet">INTERNET</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Priority</label>
                <select value={complaintPriority} onChange={(e) => setComplaintPriority(e.target.value)} className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-[11px] uppercase tracking-widest focus:outline-none focus:border-blue-500 appearance-none">
                  <option value="all">ALL</option>
                  <option value="critical">CRITICAL</option>
                  <option value="high">HIGH</option>
                  <option value="medium">MEDIUM</option>
                  <option value="low">LOW</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Building</label>
                <select value={complaintCorps} onChange={(e) => setComplaintCorps(e.target.value)} className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-[11px] uppercase tracking-widest focus:outline-none focus:border-blue-500 appearance-none">
                  <option value="all">ALL</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="p-12 text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest">Loading...</div>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-12 text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest">No complaints found.</div>
            ) : filteredComplaints.map(p => (
              <div key={p.id} className="bg-stone-900 border border-stone-800 p-6 flex flex-col md:flex-row gap-6 group hover:border-stone-600 transition-colors">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-stone-50">{p.title || "Untitled"}</h4>
                    <div className="flex gap-2 items-center">
                      {getPriorityBadge(p.priority)}
                      {getStatusBadge(p.status)}
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4 items-center">
                    <span className="px-2 py-0.5 bg-stone-800 border border-stone-700 text-stone-400 text-[9px] font-black uppercase tracking-widest">
                      {CATEGORY_LABELS[p.category] || p.category || "OTHER"}
                    </span>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                      Building {p.building} • {p.placeName}
                    </span>
                  </div>
                  <p className="text-sm text-stone-400 mb-4 line-clamp-3 leading-relaxed">{p.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-800">
                    {p.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusChange(p.id, 'approved')} className="px-4 py-2 text-[10px] font-bold bg-blue-900/30 text-blue-500 border border-blue-800 hover:bg-blue-800 hover:text-white uppercase tracking-widest transition-colors">Publish</button>
                        <button onClick={() => handleStatusChange(p.id, 'rejected')} className="px-4 py-2 text-[10px] font-bold bg-red-900/30 text-red-500 border border-red-800 hover:bg-red-800 hover:text-white uppercase tracking-widest transition-colors">Reject</button>
                      </>
                    )}
                    {(p.status === 'approved' || p.status === 'published') && (
                      <button onClick={() => handleStatusChange(p.id, 'resolved')} className="px-4 py-2 text-[10px] font-bold bg-green-900/30 text-green-500 border border-green-800 hover:bg-green-800 hover:text-white uppercase tracking-widest transition-colors">Resolve</button>
                    )}
                    <button onClick={() => handleDelete(p.id)} className="px-4 py-2 text-[10px] font-bold bg-stone-900 text-stone-500 border border-stone-800 hover:text-red-500 hover:border-red-900 transition-colors uppercase tracking-widest">Delete</button>
                  </div>
                </div>
                {p.photoUrl && (
                  <div className="w-full md:w-48 h-32 md:h-auto border border-stone-700 bg-stone-950 shrink-0">
                    <img src={resolveImageUrl(p.thumbnail || p.photoUrl)} alt="Problem" className="w-full h-full object-cover opacity-80" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="grid lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
          {/* Ticket Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-stone-900 border border-stone-800 p-6 space-y-6">
              <h3 className="text-sm font-bold text-stone-50 uppercase tracking-widest border-b border-stone-800 pb-2">Ticket Filters</h3>
              
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Search</label>
                <input 
                  type="text" 
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Worker</label>
                <select value={ticketWorker} onChange={(e) => setTicketWorker(e.target.value)} className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-[11px] uppercase tracking-widest focus:outline-none focus:border-blue-500 appearance-none">
                  <option value="all">ALL</option>
                  <option value="unassigned">UNASSIGNED</option>
                  {employees.map(emp => (
                    <option key={emp.user} value={emp.user}>{emp.first_name} {emp.last_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Priority</label>
                <select value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)} className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-stone-300 text-[11px] uppercase tracking-widest focus:outline-none focus:border-blue-500 appearance-none">
                  <option value="all">ALL</option>
                  <option value="critical">CRITICAL</option>
                  <option value="high">HIGH</option>
                  <option value="medium">MEDIUM</option>
                  <option value="low">LOW</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="p-12 text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest">Loading...</div>
            ) : filteredTicketsList.length === 0 ? (
              <div className="p-12 text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest">No complaints to ticket.</div>
            ) : filteredTicketsList.map(p => {
              const ticket = tickets.find(t => t.complaint === p.id);
              const isPublished = p.status === 'approved' || p.status === 'published';
              return (
                <div key={p.id} className="bg-stone-900 border border-stone-800 p-6 flex flex-col justify-between group hover:border-stone-600 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-stone-50">{p.title || "Untitled"}</h4>
                      {getPriorityBadge(p.priority)}
                    </div>
                    <div className="flex gap-2 mb-4 items-center">
                      <span className="px-2 py-0.5 bg-stone-800 border border-stone-700 text-stone-400 text-[9px] font-black uppercase tracking-widest">
                        {CATEGORY_LABELS[p.category] || p.category || "OTHER"}
                      </span>
                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                        Building {p.building} • {p.placeName}
                      </span>
                    </div>
                    <p className="text-sm text-stone-400 mb-6 line-clamp-3 leading-relaxed">{p.description}</p>
                  </div>
                  <div>
                    {ticket ? (
                      <div className="bg-blue-900/10 p-4 border border-blue-900/30 relative flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Assigned Ticket #{ticket.ticket_id}</p>
                          {ticket.user && <p className="text-sm text-stone-300 font-medium">Worker: {ticket.user.first_name} {ticket.user.last_name}</p>}
                          {ticket.deadline && <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Deadline: {new Date(ticket.deadline).toLocaleDateString()}</p>}
                        </div>
                        <button 
                          onClick={() => openEditTicketModal(p, ticket)} 
                          className="p-2 bg-stone-900 border border-stone-700 text-stone-400 hover:text-blue-400 hover:border-blue-500 transition-colors"
                          title="Edit Ticket"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      isPublished ? (
                        <button 
                          onClick={() => openTicketModal(p)}
                          className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-stone-300 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-colors"
                        >
                          Create Ticket
                        </button>
                      ) : (
                        <div className="w-full px-4 py-3 bg-stone-950 border border-stone-900 text-stone-600 font-bold text-[10px] uppercase tracking-widest text-center">
                          Complaint must be published to create ticket
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {isTicketModalOpen && selectedComplaintForTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-50">{editingTicketId ? 'Edit Ticket' : 'Assign Ticket'}</h2>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-stone-500 hover:text-stone-300 transition-colors text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Complaint Summary */}
              <div className="bg-stone-800 p-4 border border-stone-700">
                <h4 className="font-bold text-stone-50 text-lg mb-1">{selectedComplaintForTicket.title}</h4>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-3">Building {selectedComplaintForTicket.building} • {selectedComplaintForTicket.placeName}</p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Assign Worker</label>
                  <select
                    value={ticketEmployee}
                    onChange={(e) => setTicketEmployee(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-stone-300 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">-- Select Employee --</option>
                    {employees.map(emp => (
                      <option key={emp.user} value={emp.user}>
                        {emp.first_name} {emp.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Completion Deadline</label>
                  <input 
                    type="date" 
                    value={ticketDeadline}
                    onChange={(e) => setTicketDeadline(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-stone-300 text-sm focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-stone-800 flex gap-4 bg-stone-900/50">
              <button 
                onClick={() => setIsTicketModalOpen(false)} 
                className="flex-1 px-4 py-3 bg-stone-800 text-stone-400 text-[10px] font-bold uppercase tracking-widest border border-stone-700 hover:text-stone-200 hover:border-stone-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTicket} 
                className="flex-1 px-4 py-3 bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest border border-blue-700 hover:bg-blue-700 transition-colors"
              >
                Save Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
