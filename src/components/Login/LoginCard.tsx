import './LoginCardStyles.css';
import { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineEmail } from 'react-icons/md';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../MyContext';

interface loginInputData {
  email: string;
  password: string;
}

function LoginCard() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(MyContext);
  const [authing, setAuthing] = useState(false);
  const [loginData, setLoginData] = useState<loginInputData>({
    email: '',
    password: ''
  });

  const [errorMessage, seterrorMessage] = useState('');

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onEmailLoginPress = () => {
    if (loginData.email === '' || loginData.password === '') {
      return seterrorMessage('Debe completar email y contraseña');
    } else if (!loginData.email.match(validRegex)) {
      return seterrorMessage('El email es incorrecto');
    }
    setAuthing(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        setIsLogged(true);
        localStorage.setItem('uid', userCredential.user.uid);
        navigate('/');
      })
      .catch((error) => {
        setAuthing(false);
        console.log('====================================');
        console.log(error.code);
        console.log(error.message);
        console.log('====================================');
        seterrorMessage(error.message);
      });
  };

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setIsLogged(true);
        localStorage.setItem('uid', response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
        seterrorMessage(error.message);
      });
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, []);

  return (
    <div className="LoginMain">
      <div className="LoginTitle">
        <h1>Gloomy</h1>
      </div>

      <div className="LoginInputs">
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value.trim() })}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value.trim() })}
        />
      </div>
      <div className="ErrorMessage">
        <p> {errorMessage} </p>
      </div>

      <div className="LoginButtons">
        <button
          className="LoginButton EmailButtonColor"
          onClick={onEmailLoginPress}
          disabled={authing}
        >
          <MdOutlineEmail className="Icons" /> Log In with email
        </button>

        <button className="LoginButton" onClick={signInWithGoogle} disabled={authing}>
          <FcGoogle className="Icons" /> Log In with Google
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
