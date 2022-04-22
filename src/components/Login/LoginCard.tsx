import './LoginCardStyles.css';
import { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineEmail } from 'react-icons/md';

function LoginCard() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, seterrorMessage] = useState('');

  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const ValidateEmail = () => {
    if (loginData.email == '' || loginData.password == '') {
      seterrorMessage('Debe completar email y contraseña');
    } else if (loginData.email.match(validRegex)) {
      seterrorMessage('');
    } else {
      seterrorMessage('El email es incorrecto');
    }
  };

  return (
    <div className="LoginMain">
      <div className="LoginTitle">
        <h1>Gloomy</h1>
      </div>

      <div className="LoginInputs">
        <input
          type="text"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value.trim() })
          }
        />

        <input
          type="text"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value.trim() })
          }
        />
      </div>
      <div className="ErrorMessage">
        <p> {errorMessage} </p>
      </div>

      <div className="LoginButtons">
        <button
          className="LoginButton EmailButtonColor"
          onClick={ValidateEmail}
        >
          <MdOutlineEmail className="Icons" /> Log In with email
        </button>

        <button className="LoginButton">
          <FcGoogle className="Icons" /> Log In with Google
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
