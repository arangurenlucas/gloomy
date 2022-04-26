import type { Event } from '../src/interfaces/Event';
import { useEffect, useState } from 'react';
import './App.css';
import MainNavigation from '../src/navigation/MainNavigation';
import MyContext from '../src/MyContext';
import Sidebar from './components/Sidebar/Sidebar';
import { getEvents } from './Service/ServiceAPI';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);

  const getEventList = async () => {
    try {
      const data = await getEvents();
      setEvents(
        data.docs.map((doc) => {
          const { eventName, description, eventCategory, eventHost, imageUrl, eventDate, expired } = doc.data();
          return {
            eventName,
            description,
            eventCategory,
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

  useEffect(() => {
    if (isLogged) {
      getEventList();
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        isLogged,
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
