import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import MyContext from '../../MyContext';
import { FaHome, FaRegCalendarAlt, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const { isLogged } = useContext(MyContext);
  return (
    <>
      {isLogged ? (
        <div className="navBarMenuContainer">
          <div className="title">
            <p>gloomy</p>
          </div>
          <nav>
            <Link className="link" to={'/'}>
              <FaHome className="icon" />
              Home
            </Link>
            <Link className="link" to={'/events'}>
              <FaRegCalendarAlt className="icon" />
              My Events
            </Link>
            <Link className="link" to={'/account'}>
              <FaUser className="icon" />
              Account
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
