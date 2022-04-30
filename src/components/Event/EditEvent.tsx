import type { editEventType } from '../../interfaces/Event';
import './editEvent.css';
import './newEventScreen.css';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from 'react-datetime-picker';
import { updateEvent } from '../../Service/ServiceAPI';

type eventViewProps = {
  eventInfo: editEventType;
  setEditClickedState: Function;
};

type MsgError = {
    error: boolean;
    message: string;
  };
  
function EditEvent(props: eventViewProps) {
  const eventype: string[] = ['', 'Social', 'Deportivo', 'Ocio', 'Empresarial', 'Otros'];
  const { id, eventName, eventCategory, description, eventDate, imageUrl } = props.eventInfo;
  const [message, setMessage] = useState<MsgError>({ error: false, message: '' });
  const [editedEvent, setEvent] = useState<editEventType>({
    id: id,
    eventName: eventName,
    eventDate: eventDate,
    eventCategory: eventCategory,
    imageUrl: imageUrl,
    description: description,
  });

  const saveEvent = async (event: editEventType) => {
    
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
    } else if (event.imageUrl == '') {
      setMessage({ error: true, message: 'El evento debe tener una imagen' });
    } else {
      try {
        await updateEvent(event.id, event);
        setMessage({ error: false, message: 'El evento se actualizó correctamente' });
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

        <div className="EventFileInput">
          <p>Imagen del evento:</p>
          <div className="FileInput">
            <input className='ClaseAEliminar' type="text" value={editedEvent.imageUrl}
              onChange={(e) => {
                setEvent({ ...editedEvent, imageUrl: e.target.value });
              }} />
            <p>{editedEvent.imageUrl}</p>
          </div>
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
          <button onClick={() => saveEvent(editedEvent)}> Guardar</button>
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
