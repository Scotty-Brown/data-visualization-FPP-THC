export default function Sidebar() {
  const sideBarLabels = {
    main: [
      "Dashboard",
      "Watchlist",
      "Stocks",
      "Filter",
      "Take Home Assignment"
    ],
    secondary: ["Help", "Account"]
  };

  return (
    <div className=" bg-blue-900 w-1/6 h-screen rounded-r-3xl flex flex-col justify-between pt-10 pb-10 text-center">
      <h1 id="valueglance-title" className="text-gray-custom-light text-2xl">
        ValueGlance
      </h1>
      <ul className="space-y-5 pb-60">
        {sideBarLabels.main.map((label) => {
          if (label === "Take Home Assignment") {
            return (
              <li
                id="takehome-assignment"
                key={label}
                className="text-white bg-white bg-opacity-20 h-10 flex flex-row items-center justify-center border-l-4 cursor-pointer">
                {label}
              </li>
            );
          }
          return (
            <li id="sidebar-top-labels" key={label} className="text-gray-custom-light cursor-pointer">
              {label}
            </li>
          );
        })}
      </ul>
      <ul className="space-y-5">
        {sideBarLabels.secondary.map((label) => {
          return (
            <li id="sidebar-bottom-labels" key={label} className="text-gray-custom-light">
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
