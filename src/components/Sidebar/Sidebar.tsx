import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar: FC = () => {
  return (
    <div className="container">
      <div className="title">
        <p>gloomy</p>
      </div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/events"}>Events</Link>
        <Link to={"/account"}>Account</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
