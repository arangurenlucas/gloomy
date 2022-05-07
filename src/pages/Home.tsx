import type { Event } from '../interfaces/Event';
import { useContext, useEffect, useState } from 'react';
import EventCard from '../components/Event/EventCard';
import MyContext from '../MyContext';
import './homepage.css';

function Home() {
  const [shownData, setShownData] = useState<Event[]>([]);
  const { events, userData } = useContext(MyContext);

  useEffect(() => {
    if (events) {
      const filteredData = events.filter((event: Event) => {
        return userData.uid === event.subscribers[0];
      });
      setShownData(filteredData);
    }
  }, [events]);

  return (
    <div className="homeContainer">
      <div className="center">
        {shownData.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;
