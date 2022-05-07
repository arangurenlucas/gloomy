import type { Event } from '../src/interfaces/Event';
import type { User } from './interfaces/User';
import { useEffect, useState } from 'react';
import './App.css';
import MainNavigation from '../src/navigation/MainNavigation';
import MyContext from '../src/MyContext';
import Sidebar from './components/Sidebar/Sidebar';
import { getEvents, getUserData } from './Service/ServiceAPI';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Service/config';
import { Auth, getAuth } from 'firebase/auth';

initializeApp(firebaseConfig);

function App(): JSX.Element {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [userData, setUserData] = useState<User>();
  const [user, setUser] = useState<Auth>();
  const auth = getAuth();

  const getEventList = async () => {
    try {
      const data = await getEvents();
      setEvents(
        data.docs.map((doc) => {
          const {
            eventName,
            description,
            eventCategory,
            imageUrl,
            eventDate,
            subscribers,
            hostUid
          } = doc.data();
          return {
            eventName,
            description,
            eventCategory,
            imageUrl,
            eventDate,
            subscribers,
            hostUid,
            id: doc.id
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthStateChanged = (user: any) => {
    setUser(user);
  };

  //  Add listener to auth state
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, [auth]);

  async function getUser() {
    return localStorage.getItem('uid');
  }

  useEffect(() => {
    setRefreshData(false);

    getUser()
      .then((uid) => {
        if (uid) {
          getUserData(uid).then((user) => {
            if (user.exists()) {
              const { displayName, email, photoURL } = user.data();
              setUserData({ displayName, email, photoURL, uid: user.id });
            }
          });
          setIsLogged(true);
        } else {
          throw new Error('No user logged');
        }
      })
      .catch((error) => {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
      });

    if (isLogged) {
      getEventList();
    }
  }, [isLogged, refreshData]);

  return (
    <MyContext.Provider
      value={{
        isLogged,
        setIsLogged,
        events,
        setRefreshData,
        userData
      }}
    >
      <div className="App">
        <Sidebar />
        <MainNavigation />
      </div>
    </MyContext.Provider>
  );
}

export default App;
