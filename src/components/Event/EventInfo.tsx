import type { eventInfoType } from '../../interfaces/eventType';
import { FcCalendar } from 'react-icons/fc';
import '../Styles/eventInfo.css';

function EventInfo(props: eventInfoType) {
  return (
    <div className="eventInfo">
      <div className="eventTitle">
        <h3>{props.title}</h3>
        <h4>{props.category}</h4>
      </div>
      <div className="eventProperties">
        <p>{props.description}</p>
      </div>
      <div className="eventDate">
        <FcCalendar className="eventDateIcon" />
        <h4>{props.date}</h4>
      </div>
    </div>
  );
}

export default EventInfo;
