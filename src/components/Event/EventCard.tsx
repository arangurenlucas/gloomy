import type { Event } from '../../interfaces/Event';
import EventInfo from './EventInfo';
import './event.css';
function EventCard(props: Event) {
  return (
    <div className="eventCardContainer">
      <img src={props.imageUrl} />
      <EventInfo
        eventName={props.eventName}
        eventCategory={props.eventCategory}
        description={props.description}
        eventDate={props.eventDate}
      />
    </div>
  );
}

export default EventCard;
