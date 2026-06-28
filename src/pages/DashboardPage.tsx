import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApprovedComplaints, CATEGORY_LABELS } from "../services/problemsApi";
import { resolveImageUrl } from "../services/imageUtils";
import { List, Droplet, Zap, Armchair, Wifi } from "lucide-react";

const DashboardPage = () => {
  const [activeПроблемаs, setActiveПроблемаs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeКатегорія, setActiveКатегорія] = useState("all");
  const [activeCorps, setActiveCorps] = useState("all");
  const [activeПріоритет, setActiveПріоритет] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Всі", icon: List },
    { id: "plumbing", name: "Сантехніка", icon: Droplet },
    { id: "electricity", name: "Електрика", icon: Zap },
    { id: "furniture", name: "Меблі", icon: Armchair },
    { id: "internet", name: "Інтернет", icon: Wifi },
  ];

  const [selectedComplaintDetails, setSelectedComplaintDetails] = useState<any>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const openComplaintDetails = (complaint: any) => {
    setSelectedComplaintDetails(complaint);
    setIsImageZoomed(false);
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
        const activeData = await fetchApprovedComplaints("new", { corps: activeCorps, priority: activeПріоритет });
        if (!alive) return;
        setActiveПроблемаs(Array.isArray(activeData) ? activeData : []);
      } catch (e) {
        console.error("Failed to fetch active problems", e);
      } finally {
        if (alive) setLoading(false);
      }
    };

    loadData();
    return () => { 
      alive = false; 
    };
  }, [activeCorps, activeПріоритет]);

  const visible = activeПроблемаs
    .filter(p => {
      const matchesКатегорія = activeКатегорія === "all" || p.category === activeКатегорія;
      const matchesSearch = searchQuery === "" || 
        (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesКатегорія && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Loading...</div>;

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex justify-between items-end border-b border-stone-800 pb-2">
        <div>
          <h1 className="text-4xl font-bold text-stone-50 mb-2">
            Активні Заявки
          </h1>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Переглянути всі заявки
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/user"
            className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
          >
            Повернутися до профілю
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <input 
              type="text" 
              placeholder="Пошук заявок..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-50 text-sm focus:outline-none focus:border-stone-600 transition-colors w-full sm:w-64"
            />
            <select 
              value={activeCorps}
              onChange={e => setActiveCorps(e.target.value)}
              className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-50 text-sm focus:outline-none focus:border-stone-600 transition-colors"
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
              value={activeПріоритет}
              onChange={e => setActiveПріоритет(e.target.value)}
              className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-50 text-sm focus:outline-none focus:border-stone-600 transition-colors"
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
                onClick={(e) => { e.stopPropagation(); setActiveКатегорія(category.id); }}
                className={`flex items-center gap-2 px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeКатегорія === category.id
                    ? "bg-stone-800 text-white border-stone-600 shadow-sm"
                    : "bg-stone-950 text-stone-500 border-stone-800 hover:text-stone-300 hover:border-stone-700"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
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
                <div key={p.id} onClick={() => openComplaintDetails(p)} className="bg-stone-900 border border-stone-800 p-6 sm:p-8 flex flex-col md:flex-row gap-6 group hover:border-stone-600 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                        <span>{(CATEGORY_LABELS[p.category] || p.category || "ІНШЕ").toUpperCase()}</span>
                        <span className="w-1 h-1 bg-stone-600 rounded-full"></span>
                        <span>{new Date(p.createdAt).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {p.priority && getPriorityBadge(p.priority)}
                        {getStatusBadge(p.status)}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-stone-50 mb-2">
                      {p.title || "Без назви"}
                    </h3>
                    <p className="text-sm text-stone-400 mb-8 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    <div className="pt-6 border-t border-dashed border-stone-800 space-y-3 mt-4">
                      <div className="flex text-[9px] font-bold uppercase tracking-widest">
                        <span className="w-1/3 text-left text-blue-500">ПОДАНО</span>
                        <span className={`w-1/3 text-center ${isInProgress || isResolved ? "text-stone-400" : "text-stone-700"}`}>В ПРОЦЕСІ</span>
                        <span className={`w-1/3 text-right ${isResolved ? "text-stone-400" : "text-stone-700"}`}>ВИРІШЕНО</span>
                      </div>
                      <div className="flex h-1.5 gap-1">
                        <div className="flex-1 bg-blue-600"></div>
                        <div className={`flex-1 ${isInProgress || isResolved ? "bg-blue-600" : "bg-stone-800"}`}></div>
                        <div className={`flex-1 ${isResolved ? "bg-blue-600" : "bg-stone-800"}`}></div>
                      </div>
                    </div>
                  </div>
                  {p.photoUrl && (
                    <div className="w-full md:w-48 h-32 md:h-auto border border-stone-700 bg-stone-950 shrink-0">
                      <img src={resolveImageUrl(p.thumbnail || p.photoUrl)} alt="Проблема" className="w-full h-full object-cover opacity-80" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

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
            </div>
          </div>
        </div>
      )}

      {isImageZoomed && selectedComplaintDetails?.photoUrl && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsImageZoomed(false)}>
          <img src={resolveImageUrl(selectedComplaintDetails.photoUrl)} className="max-w-full max-h-[95vh] object-contain shadow-2xl" alt="Повний розмір" />
          <button className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors" onClick={() => setIsImageZoomed(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
