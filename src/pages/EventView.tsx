import type { Event, editEventType } from '../interfaces/Event';
import type { User } from '../interfaces/User';
import { useLocation, useNavigate } from 'react-router-dom';
import { toStringDate } from '../Service/utils';
import '../components/Event/eventProperties.css';
import EditEvent from '../components/Event/EditEvent';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { deleteEvent, getUserData, updateSubscription, getUsers } from '../Service/ServiceAPI';
import MyContext from '../MyContext';
import SubscribeButton from '../components/SubscribeButton/SubscribeButton';
import UnsubscribeButton from '../components/UnsubscribeButton/UnsubscribeButton';

function EventView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRefreshData, userData } = useContext(MyContext);
  const [eventHost, setEventHost] = useState<User>();
  const [subs, setSubs] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editClicked, setEditClickedState] = useState<boolean>();
  const state = location.state as Event;
  const { eventName, eventCategory, description, eventDate, imageUrl, id, hostUid, subscribers } =
    state;
  const [editedEvent, setEditedEvent] = useState<editEventType>({
    id: id || '',
    eventName: eventName,
    eventDate: eventDate,
    eventCategory: eventCategory,
    imageUrl: imageUrl,
    description: description
  });

  const getSubsList = async () => {
    try {
      const data = await getUsers();
      const users = data.docs.map((doc) => {
        const { email, displayName, photoURL } = doc.data();
        return { email, displayName, photoURL, uid: doc.id };
      });
      setSubs(users.filter((user) => subscribers.includes(user.uid)));
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getUserData(hostUid)
      .then((user) => {
        if (user.exists()) {
          const { displayName, email, photoURL } = user.data();
          setEventHost({ displayName, email, photoURL, uid: user.id });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    getSubsList();
  }, []);

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
            <div className="subsContainer">
              <div className='centerCard'>
                {subs.map((sub: User) => (
                  <div key={sub.uid} className="subsCard">
                    <p className="subsList">{sub.displayName}</p>
                    <div className="underline" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="desc">
            <p>{description}</p>
            <p>{toStringDate(eventDate)}</p>
          </div>
          <div className="host">
            <img className="logo" src={eventHost?.photoURL} />
            <p>{eventHost?.displayName}</p>
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
