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
    <div className=" bg-blue-900 w-1/6 h-screen rounded-r-3xl flex flex-col justify-between pt-10 pb-10">
      <h2 className="text-gray-custom text-2xl">ValueGlance</h2>
      <ul className="space-y-5 pb-60">
        {sideBarLabels.main.map((label) => {
          if (label === "Take Home Assignment") {
            return (
              <li
                key={label}
                className="text-white bg-white bg-opacity-20 h-10 flex flex-row items-center justify-center border-l-4">
                {label}
              </li>
            );
          }
          return (
            <li key={label} className="text-gray-custom">
              {label}
            </li>
          );
        })}
      </ul>
      <ul className="space-y-5">
        {sideBarLabels.secondary.map((label) => {
          return (
            <li key={label} className="text-gray-custom">
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
