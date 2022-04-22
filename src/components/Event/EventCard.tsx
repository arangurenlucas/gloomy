import type { eventType } from '../../interfaces/eventType';
import { FcCalendar } from 'react-icons/fc';
import './event.css';

function EventCard(props: eventType) {
  return (
    <div className="eventCardContainer">
      <div className="eventHeader">
        <div className="profileInfo">
          <img className='profilePhoto' src={props.profilePhoto}/>
          <h2>{props.organizer}</h2>
        </div>
        <div className='eventStatus' />
      </div>
      <img src={props.img} />
      <div className="eventInfo">
        <div className="eventTitle">
          <h3>{props.title}</h3>
          <h4>{props.category}</h4>
        </div>
        <div className="eventProperties">
          <p>{props.description}</p>
        </div>
        <div className="eventDate">
          <FcCalendar className='eventDateIcon' />
          <h4>{props.date}</h4>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
