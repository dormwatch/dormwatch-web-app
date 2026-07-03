import { useState, useEffect, useRef } from "react";
import { Bell, CheckCheck } from "lucide-react";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/problemsApi";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (_) {}
  };

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 15 seconds to keep it fresh
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    if (isRead) return;
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.notification_id === id ? { ...n, is_read: true } : n))
      );
    } catch (_) {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (_) {}
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-stone-400 hover:text-stone-50 transition-colors relative cursor-pointer"
        title="Сповіщення"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-none border border-stone-900 animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-stone-900 border border-stone-750 shadow-2xl z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-950/20">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Сповіщення ({unreadCount} нових)
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-[9px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Прочитати всі
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto custom-scrollbar divide-y divide-stone-850">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Немає повідомлень
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.notification_id}
                  onClick={() => handleMarkAsRead(n.notification_id, n.is_read)}
                  className={`p-4 cursor-pointer transition-colors relative ${
                    !n.is_read
                      ? "bg-blue-950/15 border-l-2 border-l-blue-500 hover:bg-blue-950/25"
                      : "hover:bg-stone-850/50 border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span
                      className={`text-xs font-bold ${
                        !n.is_read ? "text-stone-50" : "text-stone-300"
                      }`}
                    >
                      {n.title}
                    </span>
                    {!n.is_read && (
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-none shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed mb-2">
                    {n.message}
                  </p>
                  <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                    {new Date(n.created_at).toLocaleString("uk-UA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
