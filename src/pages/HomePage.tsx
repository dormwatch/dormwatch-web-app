import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            Для студентів та адміністрації
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight text-slate-900">
            Твій гуртожиток — <br />
            <span className="text-indigo-600">твої правила.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
            Помітили зламаний кран, несправну плитку чи проблеми з опаленням?
            Повідомте про це та слідкуйте за ремонтом онлайн.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div>
              <p className="text-3xl font-black text-slate-900">№12</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Корпусів підключено
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-indigo-600">452</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Виправлено несправностей
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">92%</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Задоволеність
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/user"
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Переглянути проблеми
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
          <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg italic tracking-tight">
                Активність у вашому корпусі
              </h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Заміна розеток закінчена
                  </p>
                  <p className="text-xs text-slate-500">
                    Блок А, 3 поверх • Сьогодні о 14:20
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  🚿
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Нова заявка: Тече кран
                  </p>
                  <p className="text-xs text-slate-500">
                    Блок Г, 5 поверх • 2 год тому
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
