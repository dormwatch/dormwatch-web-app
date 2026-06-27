import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProblem, fetchUserProfile } from "../services/problemsApi";

const CreateReportPage = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("plumbing");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    placeName: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await fetchUserProfile();
        if (user) {
          const isAdmin = user.role && ["admin", "адміністратор"].includes((user.role.role_name || "").toLowerCase());
          if (isAdmin) {
            navigate("/admin");
            return;
          }
          if (user.place && user.place.place_name) {
            setFormData(prev => ({ ...prev, placeName: user.place.place_name }));
          }
        }
      } catch (e) {
         console.warn("Помилка завантаження профілю", e);
      } finally {
        setLoadingAuth(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const categories = useMemo(
    () => [
      { id: "plumbing", emoji: "🚿", name: "Сантехніка" },
      { id: "electricity", emoji: "💡", name: "Електрика" },
      { id: "furniture", emoji: "🪑", name: "Меблі" },
      { id: "internet", emoji: "🌐", name: "Інтернет" },
    ],
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Вкажи короткий заголовок проблеми.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Опиши проблему.");
      return;
    }

    setSubmitting(true);

    try {
      await createProblem({
        category: selectedCategory,
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        place_name: formData.placeName?.trim() || undefined,
        photoFile: photoFile || undefined, 
      });

      navigate("/user"); 
    } catch (err: any) {
      console.error(err);
      setError(`Не вдалось створити заявку: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingAuth) return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Перевірка доступу...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-4 mb-10 border-b border-stone-700 pb-6">
        <Link
          to="/"
          className="p-3 bg-stone-800 border border-stone-700 text-stone-50 hover:bg-stone-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-50">
            Нове звернення
          </h2>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-2">
            Створення заявки
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-900/30 border border-red-700/50 text-red-500 text-xs font-bold uppercase tracking-wider text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Category Selection */}
        <div className="bg-stone-800 border border-stone-700 p-6 sm:p-8">
          <label className="block text-[10px] font-bold text-stone-400 mb-6 uppercase tracking-widest border-b border-stone-700 pb-2">
            Категорія проблеми
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 border transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-900/20 border-blue-500 shadow-sm"
                    : "bg-stone-900 border-stone-700 hover:border-stone-500"
                }`}
              >
                <span className="text-3xl block mb-3 grayscale">{category.emoji}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedCategory === category.id ? "text-blue-400" : "text-stone-400"}`}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Details */}
        <div className="bg-stone-800 border border-stone-700 p-6 sm:p-8">
          <label className="block text-[10px] font-bold text-stone-400 mb-6 uppercase tracking-widest border-b border-stone-700 pb-2">
            Деталі заявки
          </label>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">
                  Пріоритет
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "low", label: "Низький", normal: "bg-green-900/10 text-green-600 border-green-900/30 hover:border-green-700", active: "bg-green-900/30 text-green-400 border-green-500 shadow-sm" },
                    { id: "medium", label: "Середній", normal: "bg-amber-900/10 text-amber-600 border-amber-900/30 hover:border-amber-700", active: "bg-amber-900/30 text-amber-400 border-amber-500 shadow-sm" },
                    { id: "high", label: "Високий", normal: "bg-orange-900/10 text-orange-600 border-orange-900/30 hover:border-orange-700", active: "bg-orange-900/30 text-orange-400 border-orange-500 shadow-sm" },
                    { id: "critical", label: "Критичний", normal: "bg-red-900/10 text-red-600 border-red-900/30 hover:border-red-700", active: "bg-red-900/30 text-red-400 border-red-500 shadow-sm" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, priority: p.id }))}
                      className={`flex-1 py-3 border text-[9px] uppercase tracking-widest font-bold transition-all ${
                        formData.priority === p.id ? p.active : p.normal
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">
                  Заголовок
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Коротко: тече кран..."
                  maxLength={80}
                  className="w-full p-4 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-stone-600"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">
                  Місце проблеми
                </label>
                <input
                  type="text"
                  name="placeName"
                  value={formData.placeName || ""}
                  onChange={handleInputChange}
                  placeholder="Напр. кімната 404..."
                  maxLength={100}
                  className="w-full p-4 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-stone-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">
                  Опис проблеми
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Деталі..."
                  className="w-full p-4 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-stone-600 custom-scrollbar"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">
                Фотодоказ
              </label>
              
              {photoFile && previewUrl ? (
                <div className="relative w-full aspect-square border-2 border-stone-700 bg-stone-900 overflow-hidden group">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-4 right-4 bg-stone-900/80 border border-stone-700 p-2 text-red-500 hover:bg-red-900/50 hover:border-red-900/50 transition-colors backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <label className="w-full aspect-square border-2 border-dashed border-stone-700 bg-stone-900/50 hover:bg-stone-900 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors group">
                  <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100">📷</span>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 group-hover:text-stone-300 transition-colors">
                    Натисніть для завантаження
                  </p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-5 border text-[10px] uppercase tracking-widest font-bold transition-all ${
            submitting
              ? "bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed"
              : "bg-blue-800 text-white border-blue-700 hover:bg-blue-900 shadow-sm"
          }`}
        >
          {submitting ? "..." : "Опублікувати звернення"}
        </button>
      </form>
    </div>
  );
};

export default CreateReportPage;
