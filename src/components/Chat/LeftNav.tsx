const LeftNav = () => {
    return (
      <div className="w-64 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b text-black"></h1>
        <div className="p-4">
          <div className="p-2 hover:bg-white hover:rounded-3xl">
            <button className="w-full py-2 px-4 rounded text-black">
              Show Chart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LeftNav;
  