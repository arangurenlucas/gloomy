import './newEventScreen.css';
import { useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { Timestamp } from 'firebase/firestore';
import type { Event } from '../../interfaces/Event';
import DateTimePicker from 'react-datetime-picker';

import { addEvent } from '../../Service/ServiceAPI';

type Eventprops = {
  newEventClicked: boolean;
  setNewEventClickedState: Function;
};

type MsgError = {
  error: boolean;
  message: string;
};

export default function CreateEvent(props: Eventprops) {
  const eventype: string[] = ['', 'Social', 'Deportivo', 'Ocio', 'Empresarial', 'Otros'];
  const [message, setMessage] = useState<MsgError>({ error: false, message: '' });
  const [newEvent, setNewEvent] = useState<Event>({
    eventName: '',
    description: '',
    eventHost: 'test',
    eventCategory: '',
    imageUrl: '',
    eventDate: Timestamp.fromDate(new Date()),
    expired: false
  });

  const createEvent = async (event: Event) => {
    if (
      event.eventName == '' &&
      event.description == '' &&
      event.eventCategory == '' &&
      event.imageUrl == ''
    ) {
      setMessage({ error: true, message: 'Debe completar la informacion solicitada' });
    } else if (event.eventName == '') {
      setMessage({ error: true, message: 'Debe completar el nombre del evento' });
    } else if (event.eventDate == undefined) {
      setMessage({ error: true, message: 'El evento debe tener una fecha' });
    } else if (event.eventCategory == '') {
      setMessage({ error: true, message: 'El evento debe tener una categoria' });
    } else if (event.imageUrl == '') {
      setMessage({ error: true, message: 'El evento debe tener una imagen' });
    } else if (event.description == '') {
      setMessage({ error: true, message: 'El evento debe tener una descripcion' });
    } else {
      try {
        await addEvent(event);
        setMessage({ error: false, message: 'El evento se cargó correctamente' });
        setTimeout(function () {
          props.setNewEventClickedState(false);
        }, 2000);
      } catch (error) {
        console.log('Error al agregar evento');
      }
    }
  };

  return (
    <div className="NewEventScreenModal">
      <div className="NewEventScreenInputs">
        <div className="EventTitleInput">
          <p>Nombre del Evento: </p>
          <input
            className="TitleInput"
            type="text"
            maxLength={40}
            value={newEvent.eventName}
            onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
          />
        </div>

        <div className="EventDateTimePicker">
          <p>Fecha del evento:</p>
          <DateTimePicker
            value={new Date(newEvent.eventDate.seconds * 1000)}
            minDate={new Date()}
            disableClock={true}
            calendarIcon={null}
            onChange={(e) => setNewEvent({ ...newEvent, eventDate: Timestamp.fromDate(e) })}
          />
        </div>

        <div className="EventCategoryInputs">
          <p>Categoria:</p>
          <select
            value={newEvent.eventCategory}
            onChange={(e) => setNewEvent({ ...newEvent, eventCategory: e.target.value })}
          >
            {eventype.map((type) => {
              return <option key={type}>{type}</option>;
            })}
          </select>
        </div>

        <div className="EventFileInput">
          <p>Elegí la imagen del evento:</p>
          <div className="FileInput">
            {/* <input
              type="file"
              id="upload"
              hidden
              value={newEvent.imageUrl}
              onChange={(e) => {
                setNewEvent({ ...newEvent, imageUrl: e.target.value });
              }}
            />
            <label htmlFor="upload">
              <MdOutlineCloudUpload /> Archivo
            </label> */}
            <input className='ClaseAEliminar' type="text" value={newEvent.imageUrl}
              onChange={(e) => {
                setNewEvent({ ...newEvent, imageUrl: e.target.value });
              }} />
            <p>{newEvent.imageUrl}</p>
          </div>
        </div>

        <div className="EventDescription">
          <p>Descripcion del evento:</p>
          <textarea
            cols={1}
            rows={7}
            value={newEvent.description}
            onChange={(e) => {
              setNewEvent({ ...newEvent, description: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="Buttons">
          <button onClick={() => createEvent(newEvent)}> Guardar</button>
          <button onClick={() => props.setNewEventClickedState(false)}>Cancelar</button>
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
