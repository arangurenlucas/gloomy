import { useContext } from 'react';
import MyContext from '../MyContext';
import EventCard from '../components/Event/EventCard';
import NewEvent from '../components/Event/NewEvent';
import type { Event } from '../interfaces/Event';
import './homepage.css';

function Events() {
  const { events } = useContext(MyContext);
  return (
    <div className="homeContainer">
      <div className="center">
        {events.map((event: Event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
      <NewEvent />
    </div>
  );
}
export default Events;
