import { useLocation, useNavigate } from 'react-router-dom';
import { toStringDate } from '../Service/utils';
import '../components/Event/eventProperties.css';
import type { Event } from '../interfaces/Event';
import EditEvent from '../components/Event/EditEvent';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { deleteEvent } from '../Service/ServiceAPI';
import MyContext from '../MyContext';

function EventView() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { setRefreshData} = useContext(MyContext);
  const state = location.state as Event;
  const { eventName, eventCategory, description, eventHost, eventDate, imageUrl, id } = state;
  const [editClicked, setEditClickedState] = useState<boolean>();

  const deleteEventById = (eventId: string | undefined) => {
    console.log(eventId);
    
    if (eventId) {
      deleteEvent(eventId).then(() => {
        // setRefreshData(true);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="propertiesContainer">
      <div className="imagen">
        <img src={imageUrl} />
      </div>
      <div className="properties">
        <div className="header">
          <h2>{eventName}</h2>
          <h3>{eventCategory}</h3>
        </div>
        <div className="body">
          <div className="subs">
            <p>Subs</p>
          </div>
          <div className="desc">
            <p>{description}</p>
            <p>{toStringDate(eventDate)}</p>
          </div>
          <div className="host">
            <div className="logo" />
            <p>{eventHost}</p>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="editButton" onClick={() => setEditClickedState(!editClicked)}>
          <AiOutlineEdit className="editIcon" />
        </button>
        <button className="deleteButton" onClick={() => deleteEventById(id)}>
          <AiOutlineDelete className="deleteIcon" />
        </button>
      </div>
      {editClicked ? (
        <EditEvent eventInfo={state} setEditClickedState={setEditClickedState} />
      ) : null}
    </div>
  );
}

export default EventView;
