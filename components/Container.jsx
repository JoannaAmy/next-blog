const Container = ({ children }) => {
  return (
    <div className="max-w-[1000px] mx-auto bg-zinc-50 flex flex-col min-h-max border-white border-r border-l px-5 md:px-10 pt-0 md:pt-3">
      {children}
    </div>
  );
};

export default Container;
