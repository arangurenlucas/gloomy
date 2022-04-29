import './RegisterAccount.css';
import { useState, useContext } from 'react';
import MyContext from '../../MyContext';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

interface dataAccount {
  userName: string;
  email: string;
  password: string;
}

export default function RegisterAccount() {
  const { setIsLogged } = useContext(MyContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [dataAccount, getDataAccount] = useState<dataAccount>({
    userName: '',
    email: '',
    password: ''
  });

  const [errorMessage, getErrorMessage] = useState('');

  const CreateAccount = () => {
    if (dataAccount.password == '') getErrorMessage('Es necesario indicar la contraseña');

    if (dataAccount.email == '') getErrorMessage('Es necesario indicar un email');

    if (dataAccount.userName == '') getErrorMessage('Es necesario indicar el nombre de usuario');

    try {
      if (!dataAccount.email || !dataAccount.password || !dataAccount.userName) {
        throw new Error('No se pudo validar');
      }

      createUserWithEmailAndPassword(auth, dataAccount.email, dataAccount.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem('uid', user.uid);
          setIsLogged(true);
          navigate('/');
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        })
       
    } catch (error) {
      console.log(error);
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
            value={dataAccount.userName}
            onChange={(e) => {
              getDataAccount({ ...dataAccount, userName: e.target.value.trim() });
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={dataAccount.email}
            onChange={(e) => {
              getDataAccount({ ...dataAccount, email: e.target.value.trim() });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={dataAccount.password}
            onChange={(e) => {
              getDataAccount({ ...dataAccount, password: e.target.value.trim() });
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
