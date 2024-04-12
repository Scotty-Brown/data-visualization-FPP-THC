import './App.css';
import { useState } from 'react';
import MainContent from './components/MainContent';
import Search from './components/Search';
import Sidebar from './components/Sidebar';

function App() {
const [searchResults, setSearchResults] = useState("IBM");

  return (
    <div className="flex">
      <Sidebar />
      <MainContent searchResults={searchResults} />
      <Search setSearchResults={setSearchResults} />
    </div>
  );
}

export default App;
