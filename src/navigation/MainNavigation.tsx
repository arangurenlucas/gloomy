import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import AuthRoute from '../Service/AuthRoute';
import Account from '../pages/Account';
import Events from '../pages/Events';
import Home from '../pages/Home';
import MyContext from '../MyContext';

function MainNavigation() {
  const { isLogged } = useContext(MyContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route element={<AuthRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default MainNavigation;
