import { useState } from "react";

const AdminPage = () => {
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("plumbing");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Адміністрування корпусу №4
          </h2>
          <p className="text-slate-500 mt-1">
            Всі звернення відсортовані за пріоритетом (кількістю голосів)
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="all">Всі поверхи</option>
            <option value="1">1 поверх</option>
            <option value="2">2 поверх</option>
            <option value="3">3 поверх</option>
            <option value="4">4 поверх</option>
            <option value="5">5 поверх</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              Категорії
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === "plumbing"}
                  onChange={() => setSelectedCategory("plumbing")}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm font-bold text-indigo-900">
                  Сантехніка
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === "electrical"}
                  onChange={() => setSelectedCategory("electrical")}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm font-medium text-slate-600">
                  Електрика
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === "furniture"}
                  onChange={() => setSelectedCategory("furniture")}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm font-medium text-slate-600">
                  Меблі
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === "internet"}
                  onChange={() => setSelectedCategory("internet")}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm font-medium text-slate-600">
                  Інтернет
                </span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold mb-4">Статус</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-red-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-sm font-bold text-red-900">
                  Терміново
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-yellow-600 rounded"
                />
                <span className="text-sm font-medium text-slate-600">
                  В роботі
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded"
                />
                <span className="text-sm font-medium text-slate-600">
                  Виконано
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="lg:col-span-3 space-y-4">
          {/* High Priority Report */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex gap-8 items-start hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-1 p-3 bg-amber-50 rounded-2xl border border-amber-100 min-w-[70px]">
              <svg
                className="w-5 h-5 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-lg font-black text-amber-700">128</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Зламана пральна машина №2
                  </h4>
                  <p className="text-xs font-bold text-indigo-500 uppercase mt-1">
                    Пральня • 2 поверх
                  </p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  Терміново
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Ситуація потребує негайної уваги майстра. Машина не
                запускається, горить червоний індикатор.
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-xs text-slate-400 font-medium">
                  18 коментарів • Створено 3 години тому
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                    Викликати майстра
                  </button>
                  <button className="px-4 py-2 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                    Деталі
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Priority Report */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex gap-8 items-start hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-2xl border border-blue-100 min-w-[70px]">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-lg font-black text-blue-700">67</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Відсутній стілець для навчання
                  </h4>
                  <p className="text-xs font-bold text-indigo-500 uppercase mt-1">
                    Кімната 405 • 4 поверх
                  </p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  В роботі
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                У кімнаті проживає три особи, але є лише два робочих стільці.
                Доводиться займатися по черзі.
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-xs text-slate-400 font-medium">
                  12 коментарів • Створено 1 день тому
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                    Замовити меблі
                  </button>
                  <button className="px-4 py-2 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                    Деталі
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Low Priority Report */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex gap-8 items-start hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-1 p-3 bg-slate-50 rounded-2xl border border-slate-100 min-w-[70px]">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-lg font-black text-slate-700">23</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Повільний інтернет у вечірні години
                  </h4>
                  <p className="text-xs font-bold text-indigo-500 uppercase mt-1">
                    Весь корпус • Всі поверхи
                  </p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  Новий
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Після 18:00 швидкість інтернету значно падає. Важко дивитися
                відео або завантажувати файли.
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-xs text-slate-400 font-medium">
                  7 коментарів • Створено 2 дні тому
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-bold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                    Зв'язатися з провайдером
                  </button>
                  <button className="px-4 py-2 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                    Деталі
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
