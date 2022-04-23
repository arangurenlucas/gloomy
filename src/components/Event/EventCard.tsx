import type { eventType } from '../../interfaces/eventType';
import EventHeader from './EventHeader';
import EventInfo from './EventInfo';
import '../Styles/event.css'
function EventCard(props: eventType) {
  return (
    <div className="eventCardContainer">
      <EventHeader
        profilePhoto={props.profilePhoto}
        organizer={props.organizer}
      />
      <img src={props.img} />
      <EventInfo
        title={props.title}
        category={props.category}
        description={props.description}
        date={props.date}
      />
    </div>
  );
}

export default EventCard;
