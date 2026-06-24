const Preloader = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-dashed rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Preloader;