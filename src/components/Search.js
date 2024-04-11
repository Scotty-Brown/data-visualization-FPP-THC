import { useState } from "react";
import searchSuggestions from "../mockData/SAIC-search.json";

export default function Search( {setSearchResults} ) {

    const [userSearchInput, setUserSearchInput] = useState("")
    const [searchSuggestions, setSearchSuggestions] = useState([])

    const handleSearch = (userInput) => {
    
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=demo`

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setSearchSuggestions(data.bestMatches)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleSelect = (e) => {
        console.log(e.target.value)
        setSearchResults(e.target.value)
    }

    const createSearchResults = () => {
        return searchSuggestions?.map((company) => {
            return <button onClick={handleSelect} key={company["1. symbol"]} value={company["1. symbol"]}>{company["2. name"]}</button>
        })
    }

  return (
    <div className="w-1/4 flex flex-col items-center mb-5">
      <button className=" w-1/2 rounded-lg h-10 mt-4 border-2 border-blue-900 hover:bg-blue-400">
        Leave Feedback
      </button>
      <div className="mt-20 w-4/5 h-5/6 border-2 border-blue-900 rounded-lg  pt-5">
            <h2 className="text-2xl text-center">Search</h2>
        <div className="flex items-start justify-center gap-2">
          <input type="text" placeholder="Search Company" onChange={(e) => setUserSearchInput(e.target.value)}></input>
          <button onClick={handleSearch(userSearchInput)} className="w-20 bg-white rounded-lg hover:bg-blue-400">
            Search
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mt-5">Search Results</h2>
          <ul className="flex flex-col gap-2 mt-5">
            {createSearchResults()}
            {/* <button onClick={handleSelect} value="IBM">Apple</button>
            <li>Amazon</li>
            <li>Google</li>
            <li>Facebook</li>
            <li>Microsoft</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
