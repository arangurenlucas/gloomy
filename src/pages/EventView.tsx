import { useLocation, useNavigate } from 'react-router-dom';
import { toStringDate } from '../Service/utils';
import '../components/Event/eventProperties.css';
import type { Event } from '../interfaces/Event';
import type { editEventType } from '../interfaces/Event';
import EditEvent from '../components/Event/EditEvent';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { deleteEvent, updateSubscription } from '../Service/ServiceAPI';
import MyContext from '../MyContext';
import SubscribeButton from '../components/SubscribeButton/SubscribeButton';
import UnsubscribeButton from '../components/UnsubscribeButton/UnsubscribeButton';

function EventView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRefreshData, userData } = useContext(MyContext);
  const state = location.state as Event;
  const { eventName, eventCategory, description, eventDate, imageUrl, id, hostUid, subscribers } =
    state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editedEvent, setEditedEvent] = useState<editEventType>({
    id: id || '',
    eventName: eventName,
    eventDate: eventDate,
    eventCategory: eventCategory,
    imageUrl: imageUrl,
    description: description
  });
  const [editClicked, setEditClickedState] = useState<boolean>();

  const deleteEventById = (eventId: string | undefined) => {
    setIsLoading(true);
    if (eventId) {
      deleteEvent(eventId)
        .then(() => {
          setRefreshData(true);
          navigate('/');
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  const editEvent = (
    setEditedEvent: Function,
    setEditClickedState: Function,
    event: Event,
    editClicked: boolean
  ) => {
    setEditedEvent(event);
    setEditClickedState(!editClicked);
  };

  const handleSubscription = (subscription: boolean) => {
    try {
      if (id) {
        updateSubscription(id, userData.uid, subscription)
          .then(() => {
            setRefreshData(true);
            navigate('/');
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="propertiesContainer">
      <div className="imagen">
        <img src={imageUrl} />
      </div>
      <div className="properties">
        <div className="header">
          <div className="sub-btn-container">
            {subscribers.includes(userData.uid) ? (
              <UnsubscribeButton
                disabled={isLoading}
                text="Remove sub"
                onClick={() => handleSubscription(false)}
              />
            ) : (
              <SubscribeButton
                disabled={isLoading}
                text="Subscribe"
                onClick={() => handleSubscription(true)}
              />
            )}
          </div>
          <div className="header-text">
            <h2>{eventName}</h2>
            <h3>{eventCategory}</h3>
          </div>
          <div className="header-right" />
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
            <p>{hostUid}</p>
          </div>
        </div>
      </div>
      {hostUid === userData.uid ? (
        <div className="buttonContainer">
          <button
            disabled={hostUid != userData.uid}
            className="editButton"
            onClick={() =>
              editEvent(
                setEditedEvent,
                setEditClickedState,
                state,
                editClicked ? editClicked : false
              )
            }
          >
            <AiOutlineEdit className="editIcon" />
          </button>
          <button
            disabled={hostUid != userData.uid}
            className="deleteButton"
            onClick={() => deleteEventById(id)}
          >
            <AiOutlineDelete className="deleteIcon" />
          </button>
        </div>
      ) : null}
      {editClicked ? (
        <EditEvent eventInfo={editedEvent} setEditClickedState={setEditClickedState} />
      ) : null}
    </div>
  );
}

export default EventView;
