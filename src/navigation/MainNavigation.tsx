import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';

function MainNavigation() {
  const isLogged: boolean = true;
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
