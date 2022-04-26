import { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';
import { Outlet } from 'react-router';
import Login from '../pages/Login';

function AuthRoute() {
  const { isLogged } = useContext(MyContext);

  return isLogged ? <Outlet /> : <Login />;
}

export default AuthRoute;
