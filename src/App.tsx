import type { Event } from '../src/interfaces/Event';
import { useEffect, useState } from 'react';
import './App.css';
import MainNavigation from '../src/navigation/MainNavigation';
import MyContext from '../src/MyContext';
import Sidebar from './components/Sidebar/Sidebar';
import { getEvents } from './Service/ServiceAPI';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Service/config';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

initializeApp(firebaseConfig);

function App(): JSX.Element {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<Auth>();
  const auth = getAuth();

  const getEventList = async () => {
    try {
      const data = await getEvents();
      setEvents(
        data.docs.map((doc) => {
          const { eventName, description, eventHost, imageUrl, eventDate, expired } = doc.data();
          return {
            eventName,
            description,
            eventHost,
            imageUrl,
            eventDate,
            expired,
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
  }),
    [auth];

  async function getUser() {
    return localStorage.getItem('uid');
  }

  useEffect(() => {
    getUser()
      .then((uid) => {
        if (uid) {
          setIsLogged(true);
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
  }, [isLogged]);

  return (
    <MyContext.Provider
      value={{
        isLogged,
        setIsLogged,
        events
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
