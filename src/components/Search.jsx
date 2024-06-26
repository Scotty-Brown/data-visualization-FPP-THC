import { useState } from "react";

export default function Search({ setSearchResults }) {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearch = (userInput) => {

    let apiKey

    if (userInput === "SAIC") {
      apiKey = "demo";
    } else {
      apiKey = "HXOOB7ZEO92NHPVD"
    }

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchSuggestions(data.bestMatches);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSelect = (e) => {
    setSearchResults(e.target.innerText);
  };

  const createSearchResults = () => {
    return searchSuggestions?.map((company) => {
      return (
        <li
          className="w-5/6 font-bold cursor-pointer shadow-lg bg-blue-200 hover:bg-blue-300 hover:scale-105 border-2 rounded-lg"
          onClick={(e) => handleSelect(e)}
          key={company["1. symbol"]}>
          {company["1. symbol"]}
        </li>
      );
    });
  };

  return (
    <div className="w-1/4 h-screen flex flex-col items-center pb-5">
      <button id="feedback-button" className=" w-1/2 rounded-lg h-10 mt-3 border-2 border-blue-900 hover:bg-blue-100 hover:scale-105 mb-6">
        Leave Feedback
      </button>
      <div className="mt-20 w-4/5 h-auto border-2 border-blue-900 rounded-lg pb-5">
        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="searchInput"
            className="w-full h-auto bg-blue-900 text-white text-2xl text-center pb-4 pt-2">
            Search Ticker
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Search Company"
            value={userSearchInput}
            onChange={(e) => setUserSearchInput(e.target.value.toUpperCase())}
            className="w-3/4 h-10 border border-text-gray-custom rounded-lg hover:scale-105 text-center"></input>
          <button
            id="search-button"
            onClick={() => handleSearch(userSearchInput)}
            className="w-20 bg-white rounded-lg border border-blue-900 hover:bg-blue-100 hover:scale-105">
            Search
          </button>
        </div>
        <div className="flex flex-col items-center">
          <ul id="search-results" className="flex flex-col items-center text-center gap-4 mt-5 w-full">
            {searchSuggestions ? (
              createSearchResults()
            ) : (
              <p id="no-results">No results found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
