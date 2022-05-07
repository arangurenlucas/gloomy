import type { NewUser } from '../../interfaces/User';
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
import { createUser, getUserData } from '../../Service/ServiceAPI';
import Logo from '../../assets/gloomy-logo.png';

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

  const [errorMessage, setErrorMessage] = useState('');

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onEmailLoginPress = () => {
    setErrorMessage('');
    if (loginData.email === '' || loginData.password === '') {
      return setErrorMessage('Debe completar email y contraseña');
    } else if (!loginData.email.match(validRegex)) {
      return setErrorMessage('El email es incorrecto');
    }
    setAuthing(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        setIsLogged(true);
        localStorage.setItem('uid', userCredential.user.uid);
      })
      .catch((error) => {
        console.log(error.code);

        setAuthing(false);
        switch (error.code) {
          case 'auth/wrong-password':
            setErrorMessage('La contraseña es incorrecta');
            break;
          case 'auth/user-not-found':
            setErrorMessage('El email no está registrado');
            break;

          default:
            break;
        }
      })
      .finally(() => {
        navigate('/');
      });
  };

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async ({ user }) => {
        localStorage.setItem('uid', user.uid);
        const userExists = await (await getUserData(user.uid)).exists();
        if (!userExists) {
          if (user.email && user.displayName && user.photoURL) {
            const { email, displayName, photoURL } = user;
            const newUser: NewUser = {
              email,
              displayName,
              photoURL
            };
            createUser(user.uid, newUser);
            return setIsLogged(true);
          }
        }
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
        setErrorMessage(error.message);
      })
      .finally(() => {
        navigate('/');
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
        <img className='gloomy-logo' src={Logo} />
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

      <div className="CreateAccount">
        <p>¿No tenés una cuenta?</p>
        <a
          onClick={() => {
            navigate('/create-account');
          }}
        >
          Registrate
        </a>
      </div>
    </div>
  );
}

export default LoginCard;
