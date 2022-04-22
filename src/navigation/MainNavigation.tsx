import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyContext from '../MyContext';

function MainNavigation() {
  const { isLogged } = useContext(MyContext);
  return (
    <Routes>
      {isLogged ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}

export default MainNavigation;
