import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  fetchApprovedComplaints, 
  fetchUserProfile, 
  deleteProblem,
  voteComplaint,    
  fetchComments,    
  postComment,
  deleteComment
} from "../services/problemsApi"; 
import { resolveImageUrl } from "../services/imageUtils";

const PhotoModal = ({ src, onClose }: { src: string, onClose: () => void }) => {
  if (!src) return null;
  return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={onClose}>
          <img src={src} className="max-w-full max-h-[90vh] shadow-2xl" alt="Full size" />
          <button className="absolute top-5 right-5 text-white text-4xl font-bold">&times;</button>
      </div>
  );
};

const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCorps, setActiveCorps] = useState("all");
  const [activePriority, setActivePriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [openCommentsId, setOpenCommentsId] = useState<number | null>(null);
  const [commentsData, setCommentsData] = useState<{ [key: number]: any[] }>({});
  const [commentInput, setCommentInput] = useState("");
  
  const [votedIds, setVotedIds] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "Всі", emoji: "" },
    { id: "plumbing", name: "Сантехніка", emoji: "🚿" },
    { id: "electricity", name: "Електрика", emoji: "💡" },
    { id: "furniture", name: "Меблі", emoji: "🪑" },
    { id: "internet", name: "Інтернет", emoji: "🌐" },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [complaintsData, userData] = await Promise.all([
            fetchApprovedComplaints("new", { corps: activeCorps, priority: activePriority }).catch(() => []),
            fetchUserProfile().catch(() => null)
        ]);
        if (Array.isArray(complaintsData)) setProblems(complaintsData);
        setCurrentUser(userData);
      } catch (error) {
        console.error("Critical dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCorps, activePriority]);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!window.confirm("Ви впевнені, що хочете видалити цю заявку?")) return;
    try {
        await deleteProblem(id);
        setProblems(prev => prev.filter(p => p.id !== id));
    } catch (error) {
        alert("Помилка при видаленні");
    }
  };

  const handleVote = async (id: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    
    if (votedIds.includes(id)) return;

    setProblems(prev => prev.map(p => 
        p.id === id ? { ...p, votesCount: (p.votesCount || 0) + 1 } : p
    ));

    try {
        const res = await voteComplaint(id);
        setProblems(prev => prev.map(p => 
            p.id === id ? { ...p, votesCount: res.votesCount } : p
        ));
        setVotedIds(prev => [...prev, id]); 
    } catch (error) {
        setVotedIds(prev => [...prev, id]); 
        setProblems(prev => prev.map(p => 
            p.id === id ? { ...p, votesCount: (p.votesCount || 1) - 1 } : p
        ));
    }
  };

  const toggleComments = async (id: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (openCommentsId === id) {
        setOpenCommentsId(null);
    } else {
        setOpenCommentsId(id);
        if (!commentsData[id]) {
            const comms = await fetchComments(id);
            setCommentsData(prev => ({ ...prev, [id]: comms }));
        }
    }
  };

  const handleSendComment = async (id: number, e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault(); 
      e.stopPropagation();
    }
    if (!commentInput.trim()) return;
    
    try {
        const newCommentData = await postComment(id, commentInput);
        setCommentsData(prev => ({ ...prev, [id]: [...(prev[id] || []), newCommentData] }));
        setCommentInput("");
    } catch(err) {
        alert("Не вдалось відправити коментар");
    }
  };

  const handleDeleteComment = async (complaintId: number, commentId: number, e: React.MouseEvent) => {
      e.preventDefault(); e.stopPropagation();
      if (!confirm("Видалити цей коментар?")) return;
      try {
          await deleteComment(commentId);
          setCommentsData(prev => ({
              ...prev,
              [complaintId]: prev[complaintId].filter(c => c.id !== commentId)
          }));
      } catch (e) {
          alert("Помилка видалення коментаря");
      }
  };

  const filteredProblems = problems.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'urgent': return "bg-red-900/30 text-red-500 border-red-700/50";
        case 'resolved': return "bg-green-900/30 text-green-500 border-green-700/50";
        case 'approved': return "bg-blue-900/30 text-blue-400 border-blue-700/50"; 
        default: return "bg-amber-900/30 text-amber-500 border-amber-700/50"; 
    }
  };

  const isAdmin = currentUser?.role && ["admin", "адміністратор"].includes((currentUser.role.role_name || "").toLowerCase());

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Завантаження...</div>;

  return (
    <>
    {previewImage && <PhotoModal src={previewImage} onClose={() => setPreviewImage(null)} />}

    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-700 gap-4 sm:gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-50">
            Стрічка проблем
          </h1>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-2">
            Всі активні заявки
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <input 
              type="text" 
              placeholder="Пошук заявок..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-64"
            />
            <select 
              value={activeCorps}
              onChange={e => setActiveCorps(e.target.value)}
              className="px-4 py-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Всі гуртожитки</option>
              <option value="Гуртожиток 1">Гуртожиток 1</option>
              <option value="Гуртожиток 2">Гуртожиток 2</option>
              <option value="Гуртожиток 3">Гуртожиток 3</option>
              <option value="Гуртожиток 4">Гуртожиток 4</option>
              <option value="Гуртожиток 5">Гуртожиток 5</option>
              <option value="Гуртожиток 6">Гуртожиток 6</option>
            </select>
            <select 
              value={activePriority}
              onChange={e => setActivePriority(e.target.value)}
              className="px-4 py-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Всі пріоритети</option>
              <option value="low">Низький</option>
              <option value="medium">Середній</option>
              <option value="high">Високий</option>
              <option value="critical">Критичний</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                    : "bg-stone-900 text-stone-400 border-stone-700 hover:bg-stone-800 hover:text-stone-300"
                }`}
              >
                {category.emoji && `${category.emoji} `}{category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredProblems.map((problem) => {
            const hasVoted = votedIds.includes(problem.id);
            
            return (
              <div
                key={problem.id}
                className="bg-stone-800 border border-stone-700 relative group transition-colors hover:border-stone-500"
              >
                {currentUser && (isAdmin || currentUser.user === problem.user_id) && (
                    <button 
                      onClick={(e) => handleDelete(problem.id, e)}
                      className="absolute top-4 right-4 z-10 p-2 bg-stone-900/80 backdrop-blur text-red-500 border border-red-900/50 hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
                      title="Видалити"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                )}

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={(e) => handleVote(problem.id, e)}
                      disabled={hasVoted}
                      className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 w-16 h-16 border transition-all ${
                        hasVoted 
                            ? "bg-blue-900/20 text-blue-400 border-blue-800 cursor-default"
                            : "bg-stone-900 text-stone-300 border-stone-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 cursor-pointer" 
                      }`}
                    >
                      <span className="text-xl font-black leading-none">
                        {problem.votesCount || 0}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-80">
                        {hasVoted ? "Голос" : "За"}
                      </span>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider ${getStatusColor(problem.status)}`}>
                            {problem.status === 'resolved' ? 'Вирішено' : 'Активно'}
                          </span>
                          <span className="px-2 py-0.5 border border-stone-700 bg-stone-900 text-[9px] font-black uppercase tracking-wider text-stone-400">
                            {categories.find(c => c.id === problem.category)?.name || problem.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                          Корпус {problem.building} • {problem.placeName}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-stone-50 mb-3">
                        {problem.title}
                      </h3>
                      <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                        {problem.description}
                      </p>

                      {problem.photoUrl && (
                        <div 
                          className="w-full h-48 border border-stone-700 overflow-hidden bg-stone-900 mb-6 cursor-zoom-in"
                          onClick={() => setPreviewImage(resolveImageUrl(problem.photoUrl))}
                        >
                          <img src={resolveImageUrl(problem.thumbnail || problem.photoUrl)} className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-stone-700 gap-2">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                          {new Date(problem.createdAt).toLocaleDateString()}
                        </span>
                        
                        {currentUser && (isAdmin || currentUser.user === problem.user_id) && (
                          <button onClick={(e) => toggleComments(problem.id, e)} className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                            Коментарі {openCommentsId === problem.id ? '▲' : '▼'}
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                {openCommentsId === problem.id && currentUser && (isAdmin || currentUser.user === problem.user_id) && (
                  <div className="bg-stone-900 p-6 border-t border-stone-700">
                      <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {(commentsData[problem.id] || []).length === 0 ? (
                              <p className="text-center text-[10px] uppercase tracking-widest text-stone-500 font-bold">Немає коментарів.</p>
                          ) : (
                              (commentsData[problem.id] || []).map(c => (
                                  <div key={c.id} className="bg-stone-800 p-4 border border-stone-700 relative group">
                                      <div className="flex justify-between items-baseline mb-2">
                                          <span className="text-xs font-bold text-stone-200">{c.author}</span>
                                          <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">{new Date(c.date).toLocaleDateString()}</span>
                                      </div>
                                      <p className="text-sm text-stone-400">{c.text}</p>
                                      
                                      {(currentUser?.user === c.author_id || isAdmin) && (
                                          <button 
                                              onClick={(e) => handleDeleteComment(problem.id, c.id, e)}
                                              className="absolute top-2 right-2 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                              title="Видалити"
                                          >
                                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                          </button>
                                      )}
                                  </div>
                              ))
                          )}
                      </div>
                      <div className="flex gap-2">
                          <input 
                              value={commentInput} 
                              onChange={e => setCommentInput(e.target.value)} 
                              placeholder="Написати коментар..." 
                              className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 text-sm text-stone-50 focus:outline-none focus:border-blue-500 transition-colors"
                              onKeyDown={(e) => e.key === 'Enter' && handleSendComment(problem.id, e)} 
                          />
                          <button 
                              onClick={(e) => handleSendComment(problem.id, e)} 
                              className="px-6 py-3 bg-blue-800 text-white text-[10px] uppercase tracking-widest font-bold border border-blue-700 hover:bg-blue-900 transition-colors"
                          >
                              Відправити
                          </button>
                      </div>
                  </div>
                )}

              </div>
            );
          })}

          {filteredProblems.length === 0 && (
             <div className="p-12 text-center text-[10px] uppercase tracking-widest text-stone-500 font-bold bg-stone-800 border border-stone-700 border-dashed">
                Заявок поки немає.
             </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
             <div className="bg-stone-800 border border-stone-700 p-6 sticky top-24">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="block w-full py-4 bg-blue-800 border border-blue-700 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-blue-900 transition-colors text-center"
                  >
                    Керування
                  </Link>
                ) : (
                  <Link
                    to="/create-report"
                    className="block w-full py-4 bg-white border border-white text-stone-900 text-[10px] uppercase tracking-widest font-black hover:bg-stone-200 transition-colors text-center"
                  >
                    + Створити заявку
                  </Link>
                )}
             </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default DashboardPage;
