import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  loginUser,
  registerUser,
  fetchBuildings,
  fetchPlaces,
} from "../services/problemsApi";

const EMAIL_DOMAIN_HINT = "@lpnu.ua";

const AccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    building_id: "",
    place_id: "",
  });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [buildings, setBuildings] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchUserProfile();
        if (user) {
          const role = (user.role?.role_name || "").toLowerCase();
          if (["admin", "адміністратор"].includes(role)) {
            navigate("/");
          } else {
            navigate("/user");
          }
        }
      } catch (e) {
        // Not logged in
        fetchBuildings().then(setBuildings).catch(() => {});
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (regForm.building_id) {
      fetchPlaces(regForm.building_id).then(setPlaces).catch(() => setPlaces([]));
    } else {
      setPlaces([]);
    }
  }, [regForm.building_id]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await loginUser(loginEmail, loginPassword);
      window.dispatchEvent(new Event('profileUpdated'));
      const user = await fetchUserProfile();
      const role = (user.role?.role_name || "").toLowerCase();
      if (["admin", "адміністратор"].includes(role)) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      setLoginError(err.message || "Невірний email або пароль");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (regForm.password !== regForm.confirm_password) {
      setRegError("Паролі не співпадають");
      return;
    }

    const payload: any = {
      email: regForm.email,
      password: regForm.password,
      confirm_password: regForm.confirm_password,
      first_name: regForm.first_name,
      last_name: regForm.last_name,
    };
    if (regForm.place_id) {
      payload.place_id = parseInt(regForm.place_id);
    }

    try {
      await registerUser(payload);
      setRegSuccess("Реєстрація успішна!");
      setTimeout(async () => {
        window.dispatchEvent(new Event('profileUpdated'));
        navigate("/user");
      }, 500);
    } catch (err: any) {
      setRegError("Помилка реєстрації");
    }
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh] text-[10px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">Завантаження...</div>;
  }

  return (
    <main className="flex-1 max-w-lg mx-auto w-full px-4 py-16">
      <div className="bg-stone-800 border border-stone-700 shadow-2xl">
        <div className="flex border-b border-stone-700">
          <button
            onClick={() => { setActiveTab("login"); setLoginError(""); }}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTab === "login"
                ? "bg-stone-900 text-blue-400 border-b-2 border-blue-500"
                : "text-stone-500 hover:text-stone-300 hover:bg-stone-700/50"
            }`}
          >
            Вхід
          </button>
          <button
            onClick={() => { setActiveTab("register"); setRegError(""); setRegSuccess(""); }}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTab === "register"
                ? "bg-stone-900 text-blue-400 border-b-2 border-blue-500"
                : "text-stone-500 hover:text-stone-300 hover:bg-stone-700/50"
            }`}
          >
            Реєстрація
          </button>
        </div>

        <div className="p-8">
          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-stone-50 tracking-tight">Авторизація</h2>
                <p className="text-stone-400 text-xs mt-2">Увійдіть для доступу до системи гуртожитку</p>
              </div>
              {loginError && (
                <div className="p-4 bg-red-900/30 border border-red-700/50 text-red-500 text-xs font-bold uppercase tracking-wider text-center">
                  {loginError}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={`yourname${EMAIL_DOMAIN_HINT}`}
                    className="w-full p-4 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-stone-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Пароль</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-4 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-800 border border-blue-700 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-blue-900 transition-colors">
                Увійти
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-stone-50 tracking-tight">Реєстрація</h2>
                <p className="text-stone-400 text-xs mt-2">Створіть обліковий запис студента</p>
              </div>

              {regError && <div className="p-3 bg-red-900/30 border border-red-700/50 text-red-500 text-xs font-bold text-center">{regError}</div>}
              {regSuccess && <div className="p-3 bg-green-900/30 border border-green-700/50 text-green-500 text-xs font-bold text-center">{regSuccess}</div>}

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={regForm.email}
                  onChange={handleRegChange}
                  placeholder={`yourname${EMAIL_DOMAIN_HINT}`}
                  className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-stone-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Пароль</label>
                  <input type="password" name="password" value={regForm.password} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors" required minLength={8} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Підтвердження</label>
                  <input type="password" name="confirm_password" value={regForm.confirm_password} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors" required minLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Ім&apos;я</label>
                  <input type="text" name="first_name" value={regForm.first_name} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Прізвище</label>
                  <input type="text" name="last_name" value={regForm.last_name} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Гуртожиток</label>
                <select name="building_id" value={regForm.building_id} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="">Оберіть гуртожиток</option>
                  {buildings.map((b) => <option key={b.building_id} value={b.building_id}>{b.name}</option>)}
                </select>
              </div>

              {regForm.building_id && places.length > 0 && (
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Кімната</label>
                  <select name="place_id" value={regForm.place_id} onChange={handleRegChange} className="w-full p-3 bg-stone-900 border border-stone-700 text-stone-50 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="">Оберіть кімнату</option>
                    {places.map((p) => <option key={p.place_id} value={p.place_id}>{p.place_name}</option>)}
                  </select>
                </div>
              )}

              <button type="submit" className="w-full py-4 mt-4 bg-blue-800 border border-blue-700 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-blue-900 transition-colors">
                Зареєструватися
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
