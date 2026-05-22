import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Всі", emoji: "" },
    { id: "plumbing", name: "Сантехніка", emoji: "🚿" },
    { id: "electricity", name: "Електрика", emoji: "💡" },
    { id: "furniture", name: "Меблі", emoji: "🪑" },
    { id: "internet", name: "Інтернет", emoji: "🌐" },
  ];

  const problems = [
    {
      id: 1,
      category: "plumbing",
      votes: 124,
      status: "Розглядається",
      statusColor: "bg-amber-100 text-amber-700",
      categoryColor: "bg-blue-100 text-blue-700",
      location: "Блок Г, 5 поверх",
      title: "Тече душовий кран у жіночому блоці",
      description: "Кран не закривається повністю, постійно тече гаряча вода. Це створює вогкість у всьому приміщенні.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
      date: "14.04.2024",
      comments: 12,
    },
    {
      id: 2,
      category: "electricity",
      votes: 86,
      status: "Терміново",
      statusColor: "bg-red-100 text-red-700",
      categoryColor: "bg-yellow-100 text-yellow-700",
      location: "Блок Б, 3 поверх",
      title: "Коротке замикання в розетці",
      description: "Розетка в холі іскрить при підключенні будь-якого приладу. Дуже небезпечно!",
      date: "15.04.2024",
      comments: 5,
    },
    {
      id: 3,
      category: "furniture",
      votes: 42,
      status: "Вирішено",
      statusColor: "bg-emerald-100 text-emerald-700",
      categoryColor: "bg-purple-100 text-purple-700",
      location: "Блок А, 2 поверх",
      title: "Зламані дверцята в кухонній шафі",
      description: "Дверцята відпали від завісів. Майстер пообіцяв полагодити до кінця тижня.",
      date: "13.04.2024",
      comments: 0,
      resolved: true,
    },
    {
      id: 4,
      category: "internet",
      votes: 67,
      status: "Новий",
      statusColor: "bg-slate-100 text-slate-600",
      categoryColor: "bg-green-100 text-green-700",
      location: "Весь корпус",
      title: "Повільний інтернет у вечірні години",
      description: "Після 18:00 швидкість інтернету значно падає. Важко дивитися відео або завантажувати файли.",
      date: "16.04.2024",
      comments: 8,
    },
  ];

  const filteredProblems = activeCategory === "all" 
    ? problems 
    : problems.filter(problem => problem.category === activeCategory);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Стрічка проблем
          </h1>
          <p className="text-slate-500 mt-1">
            Активні запити мешканців гуртожитку №4
          </p>
        </div>

        {/* Category Filtering */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              {category.emoji && `${category.emoji} `}{category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Feed */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center gap-1 p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 h-fit">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-lg font-black leading-none">
                      {problem.votes}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">
                      Голосів
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${problem.statusColor}`}
                        >
                          {problem.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${problem.categoryColor}`}
                        >
                          {categories.find(cat => cat.id === problem.category)?.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {problem.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {problem.description}
                    </p>
                    {problem.image && (
                      <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-6">
                        <img
                          src={problem.image}
                          className="w-full h-full object-cover"
                          alt="Проблема"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {problem.resolved ? "Завершено" : `Додано ${problem.date}`}
                      </span>
                      {problem.comments > 0 && (
                        <button className="text-indigo-600 text-xs font-bold hover:underline">
                          {problem.comments} коментарів
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredProblems.length === 0 && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Немає проблем у цій категорії</h3>
              <p className="text-slate-500 text-sm">Спробуйте вибрати іншу категорію або створити нову заявку.</p>
            </div>
          )}
        </div>

        {/* Right Column: Statistics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100">
            <h4 className="text-lg font-bold mb-4">Статистика корпусу №4</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-80">Активні проблеми</span>
                <span className="font-black">14</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-80">Вирішено за тиждень</span>
                <span className="font-black">6</span>
              </div>
              <div className="h-1.5 w-full bg-indigo-400/30 rounded-full mt-4">
                <div className="h-full w-2/3 bg-white rounded-full"></div>
              </div>
              <p className="text-[10px] font-medium opacity-70 mt-2">
                Ви вирішуєте проблеми швидше, ніж вони з'являються!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Потрібна допомога?</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Якщо ви не знайшли свою проблему в списку, ви можете створити нову заявку.
            </p>
            <Link
              to="/create-report"
              className="block w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all text-center"
            >
              Створити нову заявку
            </Link>
          </div>

          {/* Category Statistics */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">За категоріями</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">🚿 Сантехніка</span>
                <span className="font-bold text-slate-900">5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">💡 Електрика</span>
                <span className="font-bold text-slate-900">3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">🪑 Меблі</span>
                <span className="font-bold text-slate-900">4</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">🌐 Інтернет</span>
                <span className="font-bold text-slate-900">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 py-12 text-center mt-12">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          DormWatch • 2024 • Стрічка проблем
        </p>
      </footer>
    </main>
  );
};

export default DashboardPage;