import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import MyContext from '../../MyContext';
import { FaHome, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { getAuth, signOut } from 'firebase/auth';
import Logo from '../../assets/gloomy-logo.png';

const Sidebar = () => {
  const { isLogged, setIsLogged } = useContext(MyContext);
  const auth = getAuth();

  return (
    <>
      {isLogged ? (
        <div className="navBarMenuContainer">
          <div>
            <div className="title">
              <img className="gloomy-logo" src={Logo} />
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
          <button
            className="signOutButton"
            onClick={() => {
              localStorage.removeItem('userId');
              signOut(auth);
              setIsLogged(false);
              localStorage.removeItem('uid');
            }}
          >
            <BiLogOut className="logOutIcon" />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
