export default function Search() {
  return (
    <div className="w-1/4 flex flex-col items-center">
      <button className=" w-1/2 rounded-lg h-10 mt-4 border-2 border-blue-900 hover:bg-blue-400">
        Leave Feedback
      </button>
      <div className="mt-20 w-4/5 h-5/6 border-2 border-blue-900 rounded-lg  pt-5">
            <h2 className="text-2xl text-center">Search</h2>
        <div className="flex items-start justify-center gap-2">
          <input type="text" placeholder="Search Company"></input>
          <button className="w-20 bg-white rounded-lg hover:bg-blue-400">
            Search
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mt-5">Search Results</h2>
          <ul className="flex flex-col gap-2 mt-5">
            <li>Apple</li>
            <li>Amazon</li>
            <li>Google</li>
            <li>Facebook</li>
            <li>Microsoft</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
