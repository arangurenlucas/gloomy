import type { editEventType } from '../../interfaces/Event';
import './editEvent.css';
import './newEventScreen.css';
import { useContext, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from 'react-datetime-picker';
import { updateEvent } from '../../Service/ServiceAPI';
import MyContext from '../../MyContext';
import { useNavigate } from 'react-router-dom';

type eventViewProps = {
  eventInfo: editEventType;
  setEditClickedState: Function;
};

type MsgError = {
  error: boolean;
  message: string;
};

function EditEvent(props: eventViewProps) {
  const navigate = useNavigate();
  const { setRefreshData } = useContext(MyContext);
  const eventype: string[] = ['', 'Social', 'Deportivo', 'Ocio', 'Empresarial', 'Otros'];
  const { id, eventName, eventCategory, description, eventDate, imageUrl } = props.eventInfo;
  const [message, setMessage] = useState<MsgError>({ error: false, message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editedEvent, setEvent] = useState<editEventType>({
    id: id,
    eventName: eventName,
    eventDate: eventDate,
    eventCategory: eventCategory,
    imageUrl: imageUrl,
    description: description
  });

  const saveEvent = async (event: editEventType) => {
    setIsLoading(true);
    setMessage({ error: false, message: '' });
    try {
      if (event.eventName === '' && event.description === '' && event.imageUrl === '') {
        throw new Error('Debe completar todos los campos');
      }
      if (event.eventName == '') throw new Error('Debe completar el nombre del evento');
      if (event.eventDate == undefined) throw new Error('El evento debe tener una fecha');
      if (event.eventCategory == '') throw new Error('El evento debe tener una categoria');
      if (event.imageUrl == '') throw new Error('El evento debe tener una imagen');
      if (event.description == '') throw new Error('El evento debe tener una descripcion');

      await updateEvent(event.id, event).then(() => {
        setRefreshData(true);
        setMessage({ error: false, message: 'El evento se actualizó correctamente' });
        props.setEditClickedState(false);
        navigate('/');
      });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) setMessage({ error: true, message: error.message });
      console.log(error);
    }
  };

  return (
    <div className="EditScreenModal">
      <div className="EditScreenInputs">
        <div className="EventTitleInput">
          <input
            disabled={isLoading}
            className="TitleInput"
            placeholder={editedEvent.eventName}
            type="text"
            maxLength={40}
            onChange={(e) => setEvent({ ...editedEvent, eventName: e.target.value })}
          />
        </div>

        <div className="EventDateTimePicker">
          <DateTimePicker
            disabled={isLoading}
            value={new Date(editedEvent.eventDate.seconds * 1000)}
            minDate={new Date()}
            disableClock={true}
            calendarIcon={null}
            onChange={(e) => setEvent({ ...editedEvent, eventDate: Timestamp.fromDate(e) })}
          />
        </div>

        <div className="EventCategoryInputs">
          <select
            disabled={isLoading}
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
            <input
              disabled={isLoading}
              className="ClaseAEliminar"
              type="text"
              value={editedEvent.imageUrl}
              onChange={(e) => {
                setEvent({ ...editedEvent, imageUrl: e.target.value });
              }}
            />
            <p>{editedEvent.imageUrl}</p>
          </div>
        </div>

        <div className="EventDescription">
          <textarea
            disabled={isLoading}
            cols={1}
            rows={7}
            placeholder={editedEvent.description}
            onChange={(e) => {
              setEvent({ ...editedEvent, description: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="Buttons">
          <button disabled={isLoading} onClick={() => saveEvent(editedEvent)}>
            {' '}
            Guardar
          </button>
          <button disabled={isLoading} onClick={() => props.setEditClickedState(false)}>
            Cancelar
          </button>
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
