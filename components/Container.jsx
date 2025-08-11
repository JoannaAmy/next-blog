const Container = ({ children }) => {
  return (
    <div className="max-w-[1100px] mx-auto bg-zinc-50 flex flex-col min-h-screen border-white border-r border-l px-10 pt-3">
      {children}
    </div>
  );
};

export default Container;
