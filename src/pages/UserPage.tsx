import { useState } from "react";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Проблеми нашого блоку
        </h2>
        <div className="bg-white p-1 rounded-xl border border-slate-200 flex">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "new"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Нові
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "popular"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Популярні
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-10">
        <div className="p-8">
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <button className="vote-btn flex flex-col items-center gap-1 p-4 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-90">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-xl font-black">245</span>
                <span className="text-[9px] font-bold uppercase opacity-80">
                  Підтримати
                </span>
              </button>
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-md uppercase">
                  МЕБЛІ
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-md uppercase tracking-tight">
                  КІМНАТА 405 • КОРПУС 2
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Відсутній стілець для навчання
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                У кімнаті проживає три особи, але є лише два робочих стільці.
                Доводиться займатися по черзі.
              </p>

              {/* Image placeholder */}
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1544450179-74f0587a99cb?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover"
                  alt="Проблема"
                />
              </div>

              <div className="border-t border-slate-100 pt-8">
                <h5 className="font-black text-slate-900 mb-6">
                  Голоси сусідів (3)
                </h5>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex-1 text-sm">
                      <p className="font-bold text-slate-900">Петро</p>
                      <p className="text-slate-500">
                        У нас та сама проблема! Вчора ходили до кастелянки.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex-1 text-sm">
                      <p className="font-bold text-slate-900">Марія</p>
                      <p className="text-slate-500">
                        Підтримую! Дуже незручно готуватися до сесії.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex-1 text-sm">
                      <p className="font-bold text-slate-900">Олександр</p>
                      <p className="text-slate-500">
                        Може хтось має зайвий стілець?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional reports */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex gap-6 items-start">
            <div className="flex flex-col items-center gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100 min-w-[70px]">
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
              <span className="text-lg font-black text-slate-700">42</span>
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-md uppercase">
                  САНТЕХНІКА
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-md uppercase">
                  КІМНАТА 312 • КОРПУС 4
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Тече кран у ванній кімнаті
              </h4>
              <p className="text-slate-500 text-sm">
                Постійно капає вода, неможливо спати вночі.
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <span className="text-xs text-slate-400 font-medium">
                  12 коментарів
                </span>
                <span className="text-xs text-slate-400">2 години тому</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex gap-6 items-start">
            <div className="flex flex-col items-center gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100 min-w-[70px]">
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
              <span className="text-lg font-black text-slate-700">18</span>
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black rounded-md uppercase">
                  ЕЛЕКТРИКА
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-md uppercase">
                  КОРИДОР • 2 ПОВЕРХ
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Не працює освітлення в коридорі
              </h4>
              <p className="text-slate-500 text-sm">
                Темно ввечері, небезпечно ходити.
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <span className="text-xs text-slate-400 font-medium">
                  8 коментарів
                </span>
                <span className="text-xs text-slate-400">5 годин тому</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
