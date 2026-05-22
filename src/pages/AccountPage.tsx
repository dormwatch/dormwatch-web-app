const AccountPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Student Data and Statistics */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-24 bg-indigo-600 relative">
              <div className="absolute -bottom-10 left-8">
                <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=DormUser"
                    className="w-full h-full rounded-[1.25rem] bg-slate-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pt-14 pb-8 px-8">
              <h2 className="text-xl font-black text-slate-900">
                Олексій Коваленко
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-6 italic">
                Студент 3-го курсу, ФІТ
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Гуртожиток
                    </p>
                    <p className="font-bold text-slate-700">№4 (Центральний)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Кімната
                    </p>
                    <p className="font-bold text-slate-700">512 (Блок Г)</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100">
                Редагувати профіль
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
              Екстрені контакти
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Комендант
                </p>
                <p className="text-sm font-bold text-indigo-600 tracking-tight">
                  093 123 45 67
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Черговий майстер
                </p>
                <p className="text-sm font-bold text-indigo-600 tracking-tight">
                  067 987 65 43
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: My Reports Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Мої заявки
            </h1>
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
              3 активні
            </span>
          </div>

          {/* My Report Card 1 */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex gap-6">
                {/* Upvotes */}
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
                  <span className="text-lg font-black leading-none">24</span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">
                    Голосів
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-700">
                        У процесі
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700">
                        Сантехніка
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                      ID: #DW-5821
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">
                    Зламана душова кабіна (права)
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Вода не стікає, через що утворюється калюжа. Повідомив
                    коменданту вчора вранці.
                  </p>

                  {/* Admin Response */}
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50 mb-6">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-900 uppercase tracking-wider mb-1">
                          Відповідь адміна
                        </p>
                        <p className="text-xs text-indigo-700 font-medium">
                          Майстер прийде сьогодні після 15:00. Будь ласка,
                          забезпечте доступ.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                        Додано 12.04.2024
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                        Додати фото
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all">
                        Скасувати
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Report Card 2 - Resolved */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden opacity-70 grayscale">
            <div className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-1 p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 h-fit">
                  <span className="text-lg font-black leading-none">8</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">
                        Вирішено
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500">
                        Електрика
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">
                    Перегоріла лампа в блоці
                  </h3>
                  <p className="text-slate-400 text-xs italic">
                    Проблему усунено 05.04.2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Report Card 3 */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-1 p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 h-fit">
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
                  <span className="text-lg font-black leading-none">12</span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">
                    Голосів
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                        Новий
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700">
                        Меблі
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                      ID: #DW-5823
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">
                    Потрібен додатковий стілець
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    У кімнаті проживає три особи, але є лише два робочих стільці.
                    Доводиться займатися по черзі.
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                        Додано 15.04.2024
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                        Додати фото
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all">
                        Скасувати
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 py-12 mt-12 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          DormWatch • 2024 • Мій особистий кабінет
        </p>
      </footer>
    </main>
  );
};

export default AccountPage;