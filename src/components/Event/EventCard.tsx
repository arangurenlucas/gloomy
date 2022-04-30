import type { Event } from '../../interfaces/Event';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import EventInfo from './EventInfo';
import './event.css';

type EventProps = {
  event: Event
}

function EventCard({event}: EventProps) {
  const { eventName, eventCategory, description, eventDate, imageUrl  } = event
  let navigate: NavigateFunction = useNavigate();
  return (
    <div className="eventCardContainer" onClick={() => navigate('/event', {state: event})}>
      <img src={imageUrl} />
      <EventInfo
        eventName={eventName}
        eventCategory={eventCategory}
        description={description}
        eventDate={eventDate}
      />
    </div>
  );
}

export default EventCard;
