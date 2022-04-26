import type { eventInfoType } from '../../interfaces/eventType';
import './eventInfo.css';
import { toStringDate } from '../../Service/utils';

function EventInfo(props: eventInfoType) {
  const now: number = new Date().getTime() / 1000;
  const styles: React.CSSProperties = {
    backgroundColor: `${props.eventDate.seconds < now ? 'red' : 'green'}`,
    border: `1px solid ${props.eventDate.seconds < now ? 'red' : 'green'}`
  };

  return (
    <div className="eventInfo">
      <div className="eventTitle">
        <h4>{props.eventName}</h4>
        <h5>{props.eventCategory}</h5>
      </div>
      <div className="eventProperties">
        <p>{props.description}</p>
      </div>
      <div className="eventDate">
        <div className="eventStatus" style={styles} />
        <h5>{toStringDate(props.eventDate)}</h5>
      </div>
    </div>
  );
}

export default EventInfo;
