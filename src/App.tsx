import { useState } from 'react';
import './App.css';
import MainNavigation from '../src/navigation/MainNavigation';
import MyContext from '../src/MyContext';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(true);

  return (
    <MyContext.Provider
      value={{
        isLogged
      }}
    >
      <div className="App">
        <Sidebar />
        <MainNavigation />
      </div>
    </MyContext.Provider>
  );
}

export default App;
