import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";
import { fetchApprovedComplaints } from "../services/problemsApi";

const HomePage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await fetchApprovedComplaints("new");
        if (mounted) {
          setActivities(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load activity", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  const getCategoryEmoji = (cat: string) => {
    switch (String(cat).toLowerCase()) {
      case 'plumbing': return '🚿';
      case 'electricity': return '⚡';
      case 'furniture': return '🪑';
      case 'internet': return '🌐';
      default: return '🔧';
    }
  };

  const getLocationText = (p: any) => {
    const b = p.building ? `Корпус ${p.building}` : "";
    const place = p.placeName ? `, ${p.placeName}` : "";
    return `${b}${place}`;
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-10">
          <div className="space-y-6 relative">
            <div className="inline-block px-3 py-1 bg-stone-900 border border-stone-700 text-[10px] font-bold text-stone-400 uppercase tracking-widest relative">
              <span className="relative z-10">Dormwatch v2.0</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black text-stone-50 leading-[0.9] tracking-tighter uppercase relative">
              <span className="block text-blue-500">Помітив</span>
              <span className="block text-stone-50">Проблему?</span>
              <span className="block text-stone-500 line-through decoration-blue-500">Мовчиш?</span>
              <span className="block text-stone-50">Повідомляй!</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-400 max-w-md font-medium leading-relaxed">
              Не чекай, поки кран полагодиться сам. Інструмент для студентів та адміністрації: швидка фіксація, прозорий статус, реальний результат.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/user"
              className="group relative flex items-center justify-between p-6 bg-blue-600 hover:bg-blue-700 transition-colors border border-blue-500 shadow-xl overflow-hidden"
            >
              <div className="relative z-10">
                <span className="block text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Студентам</span>
                <span className="block text-lg font-black text-white">Переглянути проблеми</span>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-200 group-hover:translate-x-2 transition-transform relative z-10" />
            </Link>

            <Link
              to="/create-report"
              className="group relative flex items-center justify-between p-6 bg-stone-900 hover:bg-stone-800 transition-colors border border-stone-700 shadow-xl overflow-hidden"
            >
              <div className="relative z-10">
                <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Дія</span>
                <span className="block text-lg font-black text-stone-50">Створити заявку</span>
              </div>
              <AlertCircle className="w-6 h-6 text-stone-500 group-hover:text-stone-300 transition-colors relative z-10" />
            </Link>
          </div>


        </div>

        {/* Activity Feed */}
        <div className="relative">
          <div className="bg-stone-800 border border-stone-700 p-8 sm:p-10 relative z-10">
            <div className="flex items-center justify-between mb-8 border-b border-stone-700 pb-4">
              <h3 className="text-sm font-bold text-stone-50 uppercase tracking-widest">
                Остання активність
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              {loading && <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest text-center animate-pulse py-8">Завантаження...</div>}

              {!loading && activities.length === 0 && (
                <div className="p-8 border border-stone-700 border-dashed text-center">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Поки що тихо...</p>
                </div>
              )}

              {!loading && activities.map((item, i) => (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-4 p-4 bg-stone-900 border border-stone-700 hover:border-stone-500 transition-colors ${i === 0 ? 'opacity-100' : i === 1 ? 'opacity-70' : 'opacity-40'}`}
                >
                  <div className="w-12 h-12 bg-stone-800 border border-stone-700 flex items-center justify-center text-2xl grayscale flex-shrink-0">
                    {getCategoryEmoji(item.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-stone-50 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest bg-blue-900/30 px-2 py-0.5 border border-blue-700/50">
                        {getLocationText(item)}
                      </span>
                      <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!loading && activities.length > 0 && (
              <div className="mt-8 text-center border-t border-stone-700 pt-6">
                <Link to="/user" className="inline-block text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-50 transition-colors">
                  Дивитись всі заявки &rarr;
                </Link>
              </div>
            )}
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone-700 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
