import { useState, useEffect } from "react";
import { Briefcase, X } from "lucide-react";

import { 
  updateUserProfile, 
  changeUserRoom, 
  logoutUser 
} from "../services/problemsApi";

const SERVER_URL = "http://127.0.0.1:8000";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onProfileUpdate: () => void;
}

const ProfileModal = ({ isOpen, onClose, user, onProfileUpdate }: ProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    building: "4",
    floor: "",
    room: "",
  });

  useEffect(() => {
    if (user) {
      const placeObj = user.place;
      const buildingObj = placeObj?.building;
      setEditForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        building: buildingObj?.name || buildingObj?.building_id ? String(buildingObj?.name || buildingObj?.building_id) : "",
        floor: "",
        room: placeObj?.place_name || "",
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const placeObj = user.place;
  const buildingObj = placeObj?.building;
  const buildingInfo = buildingObj ? buildingObj.name || `№${buildingObj.number || buildingObj.building_id || '?'}` : "Не вказано";
  const roomInfo = placeObj ? placeObj.place_name : "Кімната не вказана";
  const isAdmin = user.role && ["admin", "адміністратор"].includes((user.role.role_name || "").toLowerCase());

  let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name || "Guest"}`;
  if (user.photo_url) {
    const path = user.photo_url;
    const isAbsolute = path.startsWith("http") || path.startsWith("blob:");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    avatarUrl = isAbsolute ? path : `${SERVER_URL}${cleanPath.startsWith("/api") ? "" : "/api"}${cleanPath}`;
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        email: editForm.email,
        photoFile: photoFile,
      });

      if (editForm.building && editForm.floor && editForm.room) {
        await changeUserRoom(parseInt(editForm.building), parseInt(editForm.floor), editForm.room);
      }

      onProfileUpdate();
      setIsEditing(false);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error(error);
      alert("Помилка при збереженні. Перевірте дані.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/account";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl max-h-[90vh] bg-stone-900 border border-stone-700 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800">
          <h2 className="text-xl font-bold text-stone-50">Profile</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-50 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="bg-stone-800 border border-stone-700 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold ${isAdmin ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50' : 'bg-blue-900/30 text-blue-400 border border-blue-700/50'}`}>
                {isAdmin ? "Admin" : "Student"}
              </span>
            </div>
            
            {!isEditing ? (
              <div className="p-6">
                <div className="w-20 h-20 bg-stone-900 border border-stone-600 flex items-center justify-center mb-6 overflow-hidden">
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-xl font-bold text-stone-50 mb-1">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-8">
                  {user.email}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 border-l-2 border-blue-500 pl-3">
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Building</p>
                      <p className="font-semibold text-stone-200 mt-1">{buildingInfo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-l-2 border-stone-600 pl-3">
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Room</p>
                      <p className="font-semibold text-stone-200 mt-1">{roomInfo}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <div className="flex flex-col gap-3">

                    <button onClick={handleLogout} className="w-full py-3 bg-red-900/20 border border-red-900/50 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900/40 transition-colors">
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-sm font-bold text-stone-50 mb-6 uppercase tracking-widest border-b border-stone-700 pb-2">
                  Edit Profile
                </h3>

                <div className="mb-6">
                  <div className="w-20 h-20 bg-stone-900 border border-stone-600 mb-3 overflow-hidden">
                    <img src={photoPreview || avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="cursor-pointer inline-block px-4 py-2 bg-stone-900 border border-stone-700 text-stone-300 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors">
                    New Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">First Name</label>
                    <input name="first_name" value={editForm.first_name} onChange={handleEditChange} className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Last Name</label>
                    <input name="last_name" value={editForm.last_name} onChange={handleEditChange} className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Email</label>
                    <input name="email" value={editForm.email} onChange={handleEditChange} className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1 focus:border-blue-500 outline-none" />
                  </div>
                  
                  <div className="pt-4 border-t border-stone-700">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Location</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Building</label>
                        <select name="building" value={editForm.building} onChange={handleEditChange} className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1">
                          <option value="1">№1</option>
                          <option value="2">№2</option>
                          <option value="3">№3</option>
                          <option value="4">№4</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Floor</label>
                        <input name="floor" type="number" value={editForm.floor} onChange={handleEditChange} className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1 focus:border-blue-500 outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Room</label>
                        <input name="room" value={editForm.room} onChange={handleEditChange} placeholder="405" className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-50 text-sm mt-1 focus:border-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-stone-700">
                    <button onClick={handleSaveProfile} disabled={saving} className="flex-1 py-3 bg-blue-800 border border-blue-700 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-900">
                      {saving ? "..." : "Save"}
                    </button>
                    <button onClick={() => { setIsEditing(false); setPhotoFile(null); setPhotoPreview(null); }} className="flex-1 py-3 bg-stone-900 border border-stone-700 text-stone-300 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Contacts */}
          {!isAdmin && (
            <div className="bg-stone-800 border border-stone-700 p-6">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6">
                Emergency Contacts
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-stone-900/50 border border-stone-700 p-3">
                  <div className="p-2 bg-stone-800 border border-stone-600">
                    <Briefcase className="w-4 h-4 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      Manager
                    </p>
                    <p className="text-sm font-bold text-stone-200 mt-0.5">
                      093 123 45 67
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
