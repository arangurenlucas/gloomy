import type { eventHeaderType } from '../../interfaces/eventType';
import './eventHeader.css';
function EventHeader(props: eventHeaderType) {
  return (
    <div className="eventHeader">
      <div className="profileInfo">
        <img className="profilePhoto" src={props.profilePhoto} />
        <h2>{props.organizer}</h2>
      </div>
      <div className="eventStatus" />
    </div>
  );
}

export default EventHeader;