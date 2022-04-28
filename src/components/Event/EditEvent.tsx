import type { eventInfoType } from '../../interfaces/eventType';
import './editEvent.css';
import './newEventScreen.css';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from 'react-datetime-picker';

type eventViewProps = {
  eventInfo: eventInfoType;
  setEditClickedState: Function;
};

type MsgError = {
    error: boolean;
    message: string;
  };
  
function EditEvent(props: eventViewProps) {
  const eventype: string[] = ['', 'Social', 'Deportivo', 'Ocio', 'Empresarial', 'Otros'];
  const { eventName, eventCategory, description, eventDate } = props.eventInfo;
  const [message, setMessage] = useState<MsgError>({ error: false, message: '' });
  const [editedEvent, setEvent] = useState<eventInfoType>({
    eventName: eventName,
    description: description,
    eventCategory: eventCategory,
    eventDate: eventDate
  });

  const saveEvent = async (event: eventInfoType) => {
    if (event.eventName == '' && event.description == '' && event.eventCategory == '') {
      setMessage({ error: true, message: 'Debe completar la informacion solicitada' });
    } else if (event.eventName == '') {
      setMessage({ error: true, message: 'Debe completar el nombre del evento' });
    } else if (event.eventDate == undefined) {
      setMessage({ error: true, message: 'El evento debe tener una fecha' });
    } else if (event.eventCategory == '') {
      setMessage({ error: true, message: 'El evento debe tener una categoria' });
    } else if (event.description == '') {
      setMessage({ error: true, message: 'El evento debe tener una descripcion' });
    } else {
      try {
        // await addEvent(event);
        setMessage({ error: false, message: 'El evento se cargó correctamente' });
        setTimeout(function () {
          props.setEditClickedState(false);
        }, 2000);
      } catch (error) {
        console.log('Error al agregar evento');
      }
    }
  };

  return (
    <div className="EditScreenModal">
      <div className="EditScreenInputs">
        <div className="EventTitleInput">
          <input
            className="TitleInput"
            placeholder={editedEvent.eventName}
            type="text"
            maxLength={40}
            onChange={(e) => setEvent({ ...editedEvent, eventName: e.target.value })}
          />
        </div>

        <div className="EventDateTimePicker">
          <DateTimePicker
            value={new Date(editedEvent.eventDate.seconds * 1000)}
            minDate={new Date()}
            disableClock={true}
            calendarIcon={null}
            onChange={(e) => setEvent({ ...editedEvent, eventDate: Timestamp.fromDate(e) })}
          />
        </div>

        <div className="EventCategoryInputs">
          <select
            value={editedEvent.eventCategory}
            onChange={(e) => setEvent({ ...editedEvent, eventCategory: e.target.value })}
          >
            {eventype.map((type) => {
              return <option key={type}>{type}</option>;
            })}
          </select>
        </div>

        <div className="EventDescription">
          <textarea
            cols={1}
            rows={7}
            placeholder={editedEvent.description}
            onChange={(e) => {
              setEvent({ ...editedEvent, description: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="Buttons">
          <button /*onClick={() => saveEvent(editedEvent)}*/> Guardar</button>
          <button onClick={() => props.setEditClickedState(false)}>Cancelar</button>
        </div>

        <div className="EventMessage">
          {message.message ? (
            <p className={message.error ? 'CreateEventErrorMessage' : 'CreateEventSuccessMessage'}>
              {' '}
              {message.message}{' '}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
