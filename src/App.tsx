import React from 'react';
import './App.css';
import MainNavigation from '../src/navigation/MainNavigation';
import MyContext from '../src/MyContext';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <MyContext.Provider
      value={{
        name: 'Max'
      }}
    ><div className='App'>

      <Sidebar />
      <MainNavigation />
    </div>
    </MyContext.Provider>
  );
}

export default App;
