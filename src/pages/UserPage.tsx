import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, BellOff } from "lucide-react";
import { 
  fetchMyProblems,
  fetchUserProfile, 
  CATEGORY_LABELS,
  deleteProblem,
  fetchComments,
  postComment,
  deleteComment
} from "../services/problemsApi";
import { resolveImageUrl } from "../services/imageUtils";

const UserPage = () => {
  const [myProblems, setMyProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [selectedComplaintDetails, setSelectedComplaintDetails] = useState<any>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const [comments, setКоментарі] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingКоментарі, setLoadingКоментарі] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const openComplaintDetails = async (complaint: any) => {
    setSelectedComplaintDetails(complaint);
    setIsImageZoomed(false);
    
    const isMyComplaint = myProblems.some(p => p.id === complaint.id);
    if (isMyComplaint) {
      setКоментарі([]);
      setNewComment("");
      setLoadingКоментарі(true);
      try {
        const fetched = await fetchComments(complaint.id);
        setКоментарі(fetched);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingКоментарі(false);
      }
    } else {
      setКоментарі([]);
      setNewComment("");
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim() || !selectedComplaintDetails) return;
    setPostingComment(true);
    try {
      const added = await postComment(selectedComplaintDetails.id, newComment);
      setКоментарі(prev => [...prev, added]);
      setNewComment("");
    } catch (e) {
      alert("Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  const [confirmDeleteCommentModal, setConfirmDeleteCommentModal] = useState<{isOpen: boolean, commentId: number | null}>({isOpen: false, commentId: null});
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{isOpen: boolean, complaintId: number | null}>({isOpen: false, complaintId: null});

  const handleDeleteComment = (commentId: number) => {
    setConfirmDeleteCommentModal({isOpen: true, commentId});
  };

  const executeDeleteComment = async () => {
    const { commentId } = confirmDeleteCommentModal;
    if (commentId === null) return;
    try {
      await deleteComment(commentId);
      setКоментарі(prev => prev.filter(c => c.id !== commentId));
    } catch (e) {
      alert("Failed to delete comment");
    } finally {
      setConfirmDeleteCommentModal({isOpen: false, commentId: null});
    }
  };

  const handleDeleteComplaint = (id: number) => {
    setConfirmDeleteModal({isOpen: true, complaintId: id});
  };

  const executeDeleteComplaint = async () => {
    const { complaintId } = confirmDeleteModal;
    if (complaintId === null) return;
    try {
      await deleteProblem(complaintId);
      setMyProblems(prev => prev.filter(p => p.id !== complaintId));
      setSelectedComplaintDetails(null);
    } catch (e) {
      alert("Failed to delete the complaint.");
    } finally {
      setConfirmDeleteModal({isOpen: false, complaintId: null});
    }
  };

  const getStatusBadge = (status: string) => {
    const isPending = status === "pending";
    const isResolved = status === "resolved";
    const isRejected = status === "rejected";
    const isInProgress = status === "approved" || (!isPending && !isResolved && !isRejected);

    return (
      <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
        isPending ? 'text-yellow-500 border-yellow-700/50 bg-yellow-900/30' :
        isInProgress ? 'text-blue-500 border-blue-700/50 bg-blue-900/30' :
        isResolved ? 'text-green-500 border-green-700/50 bg-green-900/30' :
        'text-stone-500 border-stone-800 bg-stone-800/50'
      }`}>
        {isPending ? 'В ОЧІКУВАННІ' : isInProgress ? 'В ПРОЦЕСІ' : isResolved ? 'ВИРІШЕНО' : 'ВІДХИЛЕНО'}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    if (!priority) return null;
    return (
      <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
        priority === 'critical' ? 'text-red-500 border-red-700/50 bg-red-900/30' :
        priority === 'high' ? 'text-orange-500 border-orange-700/50 bg-orange-900/30' :
        priority === 'low' ? 'text-green-500 border-green-700/50 bg-green-900/30' :
        'text-amber-500 border-amber-700/50 bg-amber-900/30'
      }`}>
        {priority === 'critical' ? 'КРИТИЧНИЙ' : priority === 'high' ? 'ВИСОКИЙ' : priority === 'low' ? 'НИЗЬКИЙ' : 'СЕРЕДНІЙ'}
      </span>
    );
  };

  useEffect(() => {
    let alive = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [myData, user] = await Promise.all([
           fetchMyProblems(),
           fetchUserProfile().catch(() => null)
        ]);
        if (!alive) return;
        setMyProblems(Array.isArray(myData) ? myData : []);
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

  const visible = myProblems
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Завантаження...</div>;

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-stone-50 mb-2">
          Привіт, {currentUser?.first_name || "Гість"}!
        </h1>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {currentUser?.place?.place_name || "ЛОКАЦІЮ НЕ ВКАЗАНО"}
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
            <h2 className="text-2xl font-bold text-white mb-1">Повідомити про проблему</h2>
            <p className="text-sm font-medium text-blue-200">Створіть нову заявку на ремонт для вашої кімнати або місць загального користування.</p>
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
              Мої Заявки
            </h3>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
              >
                Переглянути Стрічку
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {visible.length === 0 ? (
              <div className="p-12 border border-stone-800 border-dashed text-center">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Заявок не знайдено.</p>
              </div>
            ) : (
              visible.map((p) => {
                const isPending = p.status === "pending";
                const isResolved = p.status === "resolved";
                const isRejected = p.status === "rejected";
                const isInProgress = p.status === "approved" || (!isPending && !isResolved && !isRejected);

                return (
                  <div key={p.id} onClick={() => openComplaintDetails(p)} className="bg-stone-900 border border-stone-800 p-6 sm:p-8 hover:border-stone-700 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                        <span>{(CATEGORY_LABELS[p.category] || p.category || "ІНШЕ").toUpperCase()}</span>
                        <span className="w-1 h-1 bg-stone-600 rounded-full"></span>
                        <span>{new Date(p.createdAt).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {p.priority && (
                          <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
                            p.priority === 'critical' ? 'text-red-500 border-red-700/50 bg-red-900/30' :
                            p.priority === 'high' ? 'text-orange-500 border-orange-700/50 bg-orange-900/30' :
                            p.priority === 'low' ? 'text-green-500 border-green-700/50 bg-green-900/30' :
                            'text-amber-500 border-amber-700/50 bg-amber-900/30'
                          }`}>
                            {p.priority === 'critical' ? 'КРИТИЧНИЙ' : p.priority === 'high' ? 'ВИСОКИЙ' : p.priority === 'low' ? 'НИЗЬКИЙ' : 'СЕРЕДНІЙ'}
                          </span>
                        )}
                        <span className={`px-2 py-1 text-[9px] font-bold border uppercase tracking-widest ${
                          isPending ? 'text-yellow-500 border-yellow-700/50 bg-yellow-900/30' :
                          isInProgress ? 'text-blue-500 border-blue-700/50 bg-blue-900/30' :
                          isResolved ? 'text-green-500 border-green-700/50 bg-green-900/30' :
                          'text-stone-500 border-stone-800 bg-stone-800/50'
                        }`}>
                          {isPending ? 'В ОЧІКУВАННІ' : isInProgress ? 'В ПРОЦЕСІ' : isResolved ? 'ВИРІШЕНО' : 'ВІДХИЛЕНО'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-stone-50 mb-2">
                      {p.title || "Без назви"}
                    </h3>
                    <p className="text-sm text-stone-400 mb-8 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-6 border-t border-dashed border-stone-800 space-y-3 mt-4">
                      <div className="flex text-[9px] font-bold uppercase tracking-widest">
                        <span className="w-1/3 text-left text-blue-500">ПОДАНО</span>
                        <span className={`w-1/3 text-center ${isInProgress || isResolved ? "text-stone-400" : "text-stone-700"}`}>В ПРОЦЕСІ</span>
                        <span className={`w-1/3 text-right ${isResolved ? "text-stone-400" : "text-stone-700"}`}>ВИРІШЕНО</span>
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

        {/* Right Column: Дошка оголошень */}
        <div>
          <h3 className="text-lg font-bold text-stone-50 mb-6 border-b border-stone-800 pb-2">Дошка оголошень</h3>
          <div className="border border-stone-800 border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-16 h-16 border border-stone-800 flex items-center justify-center mb-6 text-stone-600">
              <BellOff className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-50 mb-2">Немає оголошень</h4>
            <p className="text-sm font-medium text-stone-500">
              Ваша дошка порожня. Тут ми будемо публікувати заплановані технічні роботи або новини гуртожитку.
            </p>
          </div>
        </div>
      </div>

      {/* Деталі Заявки Modal */}
      {selectedComplaintDetails && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={() => setSelectedComplaintDetails(null)}></div>
          <div className="relative w-full max-w-xl h-full bg-stone-900 border-l border-stone-700 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-stone-800 flex justify-between items-center sticky top-0 bg-stone-900/95 backdrop-blur z-10">
              <h2 className="text-xl font-bold text-stone-50">Деталі Заявки</h2>
              <button onClick={(e) => { e.stopPropagation(); setSelectedComplaintDetails(null); }} className="text-stone-500 hover:text-stone-300 transition-colors text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-6 flex-1">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-stone-50">{selectedComplaintDetails.title || "Без назви"}</h3>
                  <div className="flex gap-2 items-center shrink-0 ml-4">
                    {getPriorityBadge(selectedComplaintDetails.priority)}
                    {getStatusBadge(selectedComplaintDetails.status)}
                  </div>
                </div>
                <div className="flex gap-2 mb-4 items-center flex-wrap">
                  <span className="px-2 py-0.5 bg-stone-800 border border-stone-700 text-stone-400 text-[9px] font-black uppercase tracking-widest">
                    {CATEGORY_LABELS[selectedComplaintDetails.category] || selectedComplaintDetails.category || "ІНШЕ"}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                    Гуртожиток {selectedComplaintDetails.building} • {selectedComplaintDetails.placeName}
                  </span>
                </div>
                <p className="text-sm text-stone-300 mb-6 leading-relaxed whitespace-pre-wrap">{selectedComplaintDetails.description}</p>
                <div className="mt-4">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Подано:</span>
                  <p className="text-sm text-stone-300">{new Date(selectedComplaintDetails.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              {selectedComplaintDetails.photoUrl && (
                <div className="border border-stone-700 bg-stone-950 p-2 cursor-pointer group mb-6" onClick={(e) => { e.stopPropagation(); setIsImageZoomed(true); }}>
                  <img src={resolveImageUrl(selectedComplaintDetails.photoUrl)} alt="Проблема" className="w-full object-contain" />
                </div>
              )}

              {myProblems.some(p => p.id === selectedComplaintDetails.id) && (
                <div className="mt-8 border-t border-stone-800 pt-6">
                  <h4 className="text-sm font-bold text-stone-50 uppercase tracking-widest mb-4">Коментарі</h4>
                  <div className="space-y-4 mb-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    {loadingКоментарі ? (
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Завантаження...</p>
                    ) : comments.length === 0 ? (
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Ще немає коментарів.</p>
                    ) : (
                      comments.map(c => (
                        <div key={c.id} className="bg-stone-950 border border-stone-800 p-3 group">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{c.author}</span>
                              {(selectedComplaintDetails.user_id && c.author_id !== selectedComplaintDetails.user_id) && <span className="bg-red-900/30 text-red-500 border border-red-800 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest">Адмін</span>}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-stone-600 font-bold">{new Date(c.date).toLocaleString()}</span>
                              {currentUser && c.author_id === currentUser.user && (
                                <button 
                                  onClick={() => handleDeleteComment(c.id)}
                                  className="text-red-900 hover:text-red-500 transition-colors text-lg leading-none opacity-0 group-hover:opacity-100"
                                  title="Видалити Коментар"
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-stone-300">{c.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex gap-2 mb-6">
                    <input 
                      type="text" 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)} 
                      placeholder="Додати коментар..." 
                      className="flex-1 bg-stone-950 border border-stone-800 text-stone-50 text-sm px-3 py-2 focus:border-blue-500 outline-none"
                    />
                    <button 
                      onClick={handlePostComment}
                      disabled={postingComment || !newComment.trim()}
                      className="bg-blue-800 hover:bg-blue-900 disabled:bg-stone-800 text-white px-4 text-[10px] uppercase tracking-widest font-bold transition-colors"
                    >
                      {postingComment ? "..." : "Надіслати"}
                    </button>
                  </div>
                </div>
              )}

              {myProblems.some(p => p.id === selectedComplaintDetails.id) && (
                <div className="border-t border-stone-800 pt-6 mt-auto">
                  <button 
                    onClick={() => handleDeleteComplaint(selectedComplaintDetails.id)}
                    className="w-full py-3 bg-red-900/20 border border-red-900/50 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900/40 transition-colors"
                  >
                    Видалити Заявку
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isImageZoomed && selectedComplaintDetails?.photoUrl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-stone-950/95 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsImageZoomed(false)}>
          <button onClick={() => setIsImageZoomed(false)} className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors text-4xl leading-none">&times;</button>
          <img src={resolveImageUrl(selectedComplaintDetails.photoUrl)} alt="Збільшене фото проблеми" className="max-w-[90vw] max-h-[90vh] object-contain border border-stone-800 shadow-2xl" />
        </div>
      )}
      {/* Confirm Видалити Коментар Modal */}
      {confirmDeleteCommentModal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setConfirmDeleteCommentModal({isOpen: false, commentId: null})}>
          <div className="bg-stone-900 border border-red-900/30 w-full max-w-md p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-stone-50 mb-4">Підтвердити Видалення</h3>
            <p className="text-sm text-stone-400 mb-8 leading-relaxed">
              Ви впевнені, що хочете видалити цей коментар назавжди? Цю дію неможливо скасувати.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setConfirmDeleteCommentModal({isOpen: false, commentId: null})} className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 text-[10px] font-bold text-stone-300 uppercase tracking-widest hover:bg-stone-800 transition-colors">
                Скасувати
              </button>
              <button onClick={executeDeleteComment} className="flex-1 px-4 py-3 bg-red-900/30 border border-red-800 text-[10px] font-bold text-red-500 uppercase tracking-widest hover:bg-red-800 hover:text-white transition-colors">
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setConfirmDeleteModal({isOpen: false, complaintId: null})}>
          <div className="bg-stone-900 border border-red-900/30 w-full max-w-md p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-stone-50 mb-4">Підтвердити Видалення</h3>
            <p className="text-sm text-stone-400 mb-8 leading-relaxed">
              Ви впевнені, що хочете видалити цю заявку назавжди? Цю дію неможливо скасувати.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setConfirmDeleteModal({isOpen: false, complaintId: null})} className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 text-[10px] font-bold text-stone-300 uppercase tracking-widest hover:bg-stone-800 transition-colors">
                Скасувати
              </button>
              <button onClick={executeDeleteComplaint} className="flex-1 px-4 py-3 bg-red-900/30 border border-red-800 text-[10px] font-bold text-red-500 uppercase tracking-widest hover:bg-red-800 hover:text-white transition-colors">
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
