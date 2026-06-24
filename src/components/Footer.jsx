const Footer = () => {
  return (
    <footer className="bg-slate-900 py-8 sm:py-12 lg:py-16 text-white mt-8 sm:mt-10 lg:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center md:justify-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-xs sm:text-sm font-black">DW</div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">DormWatch</span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">Система прямої комунікації між студентами та адміністрацією.</p>
        </div>
        <p className="text-indigo-400 font-bold text-xs sm:text-sm text-center md:text-right">support@dormwatch.edu.ua</p>
      </div>
    </footer>
  );
};

export default Footer;