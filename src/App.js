import './App.css';
import MainContent from './components/MainContent';
import Search from './components/Search';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
      <Search />
    </div>
  );
}

export default App;
