import type { EmailAndPasswordUser, NewUser } from '../../interfaces/User';
import './RegisterAccount.css';
import { useState, useContext } from 'react';
import MyContext from '../../MyContext';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../../Service/ServiceAPI';

export default function RegisterAccount() {
  const { setIsLogged } = useContext(MyContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [newUser, getNewUser] = useState<EmailAndPasswordUser>({
    displayName: '',
    email: '',
    password: '',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/gloomy-a76a2.appspot.com/o/userPhoto%2FunknownUser.jpg?alt=media&token=e29a9382-00fa-41be-9fe2-51fc1fd5ecb0'
  });

  const [errorMessage, setErrorMessage] = useState('');

  const CreateAccount = () => {
    try {
      if (newUser.password == '') throw setErrorMessage('La contraseña es obligatoria');
      if (newUser.displayName == '') throw setErrorMessage('El user nombre de usuario obligatorio');
      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(({ user }) => {
          localStorage.setItem('uid', user.uid);
          const { displayName, email, photoURL } = newUser;
          const newEmailUser: NewUser = {
            displayName,
            email,
            photoURL
          };
          createUser(user.uid, newEmailUser);
          setIsLogged(true);
          navigate('/');
        })
        .catch((error) => {
          console.log(error.message);
          switch (error.code) {
            case 'auth/email-already-in-use':
              setErrorMessage('El email ya está en uso');
              break;
            case 'auth/invalid-email':
              setErrorMessage('El email es incorrecto');
              break;
            case 'auth/weak-password':
              setErrorMessage('La contraseña es muy débil');
              break;
            case 'auth/missing-email':
              setErrorMessage('El email es obligatorio');
              break;
            case 'auth/missing-password':
              setErrorMessage('La contraseña es obligatoria');
              break;

            default:
              break;
          }
        });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  return (
    <div className="Container">
      <div className="RegisterAccountCard">
        <div className="Title">
          <h1>Crea tu cuenta</h1>
        </div>

        <div className="RegisterAccountInputs">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={newUser.displayName}
            onChange={(e) => {
              getNewUser({ ...newUser, displayName: e.target.value.trim() });
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
              getNewUser({ ...newUser, email: e.target.value.trim() });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => {
              getNewUser({ ...newUser, password: e.target.value.trim() });
            }}
          />
        </div>

        <div className="ErrorMessage">
          <p> {errorMessage} </p>
        </div>

        <div className="ButtonSection">
          <button
            className="Button"
            onClick={() => {
              CreateAccount();
            }}
          >
            <VscAccount className="AccountIcon" /> Crear Cuenta
          </button>

          <button
            className="Button"
            onClick={() => {
              navigate('/login');
            }}
          >
            <MdCancel className="AccountIcon" /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
