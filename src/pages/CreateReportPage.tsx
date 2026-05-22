import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateReportPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("plumbing");
  const [formData, setFormData] = useState({
    building: "4",
    floor: "4",
    room: "",
    description: "",
  });

  const categories = [
    { id: "plumbing", emoji: "🚿", name: "Сантехніка" },
    { id: "electrical", emoji: "💡", name: "Електрика" },
    { id: "furniture", emoji: "🪑", name: "Меблі" },
    { id: "internet", emoji: "🌐", name: "Інтернет" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log("Report submitted:", { selectedCategory, ...formData });
    // Navigate to user page after submission
    navigate("/user");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/"
            className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </Link>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Нове звернення
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Що трапилось?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 border-2 rounded-2xl text-center transition-all ${
                    selectedCategory === category.id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-slate-100 hover:border-indigo-100"
                  }`}
                >
                  <span className="text-2xl block mb-2">{category.emoji}</span>
                  <span className="text-xs font-bold">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                Корпус
              </label>
              <select
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="4">№4</option>
                <option value="2">№2</option>
                <option value="3">№3</option>
                <option value="5">№5</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                Поверх
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                Кімната
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="405"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Description and Photo */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Опис проблеми
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Детально опишіть ситуацію..."
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Фотодоказ
              </label>
              <div className="w-full aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <svg
                  className="w-8 h-8 text-indigo-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-xs font-bold text-slate-500 leading-tight">
                  Завантажити фото
                </p>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            Опублікувати звернення
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReportPage;
