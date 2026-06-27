import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-800 border-t border-stone-700 py-12 text-stone-50 mt-12 shrink-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            <span className="text-lg font-bold tracking-tight">DormWatch</span>
          </div>
          <p className="text-stone-400 text-xs tracking-wider uppercase">Система прямої комунікації між студентами та адміністрацією.</p>
        </div>
        <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase text-[10px]">support@dormwatch.edu.ua</p>
      </div>
    </footer>
  );
};

export default Footer;