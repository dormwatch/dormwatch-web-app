const Footer = () => {
  return (
    <footer className="bg-slate-900 py-16 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black">DW</div>
            <span className="text-xl font-bold tracking-tight">DormWatch</span>
          </div>
          <p className="text-slate-400 text-sm">Система прямої комунікації між студентами та адміністрацією.</p>
        </div>
        <p className="text-indigo-400 font-bold text-sm">support@dormwatch.edu.ua</p>
      </div>
    </footer>
  );
};

export default Footer;