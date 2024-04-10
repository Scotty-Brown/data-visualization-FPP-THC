export default function MainContent() {
  return (
    <div className="w-7/12 flex flex-col gap-5">
      <h1 className="text-2xl text-left mt-5 ml-10">Visualization Page</h1>

      {/* general info section */}
      <div className="flex w-full justify-around items-center text-left">
        <div className="w-10 h-10 bg-blue-900"></div>
        <div>
          <h2 className="font-extrabold">AMZN</h2>
          <p className="text-gray-custom">Amazon.com Inc.</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Industry</h3>
          <p className="font-bold">Internet Retail</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Sector</h3>
          <p className="font-bold">Consumer Cyclical</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Latest Quarter</h3>
          <p className="font-bold">2023-12-31</p>
        </div>
      </div>

      {/* line graph */}
      <div className="bg-slate-400 h-full text-center"> line graph</div>
    </div>
  );
}
