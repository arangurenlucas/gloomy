import './newEventScreen.css';
import { useContext, useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { Timestamp } from 'firebase/firestore';
import type { Event } from '../../interfaces/Event';
import DateTimePicker from 'react-datetime-picker';
import { addEvent, uploadImage } from '../../Service/ServiceAPI';
import { getDownloadURL } from 'firebase/storage';
import MyContext from '../../MyContext';

type Eventprops = {
  newEventClicked: boolean;
  setNewEventClickedState: Function;
};

type MsgError = {
  error: boolean;
  message: string;
};

type eventType = ['Social', 'Sports', 'Cultural', 'Business', 'Other'];

export default function CreateEvent(props: Eventprops) {
  const eventype: eventType = ['Social', 'Sports', 'Cultural', 'Business', 'Other'];
  const { setRefreshData } = useContext(MyContext);
  const [message, setMessage] = useState<MsgError>({ error: false, message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    eventName: '',
    description: '',
    eventHost: 'test',
    eventCategory: '',
    imageUrl: '',
    eventDate: Timestamp.fromDate(new Date()),
    expired: false
  });

  const onCreateEventSubmit = () => {
    setIsLoading(true);

    if (
      newEvent.eventName == '' &&
      newEvent.description == '' &&
      newEvent.eventCategory == '' &&
      newEvent.imageUrl == null
    ) {
      setMessage({ error: true, message: 'Debe completar la informacion solicitada' }); // Hay que implementar switch case u otro tipo de manejo de condiciones acá
    } else if (newEvent.eventName == '') {
      return setMessage({ error: true, message: 'Debe completar el nombre del evento' });
    } else if (newEvent.eventDate == undefined) {
      return setMessage({ error: true, message: 'El evento debe tener una fecha' });
    } else if (newEvent.eventCategory == '') {
      return setMessage({ error: true, message: 'El evento debe tener una categoria' });
    } else if (!imageToUpload) {
      return setMessage({ error: true, message: 'El evento debe tener una imagen' });
    } else if (newEvent.description == '') {
      return setMessage({ error: true, message: 'El evento debe tener una descripcion' });
    }
    const uid = localStorage.getItem('uid');
    try {
      if (imageToUpload && uid) {
        uploadImage(uid, imageToUpload)
          .then(async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref);
            addEvent({ ...newEvent, imageUrl: url });
            setRefreshData(true);
            props.setNewEventClickedState(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
      console.log('Error al agregar evento');
    }
  };

  return (
    <div className="NewEventScreenModal">
      <div className="NewEventScreenInputs">
        <div className="EventTitleInput">
          <p>Nombre del Evento: </p>
          <input
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            <input
              disabled={isLoading}
              type="file"
              id="upload"
              hidden
              value={newEvent.imageUrl}
              onChange={(e) => {
                // handleFileToUpload(e)
                setImageToUpload(e.target.files ? e.target.files[0] : null);
              }}
            />
            <label htmlFor="upload">
              <MdOutlineCloudUpload /> Archivo
            </label>
            {/* <input className='ClaseAEliminar' type="text" value={newEvent.imageUrl} // Commented until url file upload is implemented
              onChange={(e) => {
                setNewEvent({ ...newEvent, imageUrl: e.target.value });
              }} /> */}
            <p>{newEvent.imageUrl}</p>
          </div>
        </div>

        <div className="EventDescription">
          <p>Descripcion del evento:</p>
          <textarea
            disabled={isLoading}
            cols={1}
            rows={7}
            value={newEvent.description}
            onChange={(e) => {
              setNewEvent({ ...newEvent, description: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="Buttons">
          <button disabled={isLoading} onClick={() => onCreateEventSubmit()}>
            Guardar
          </button>
          <button disabled={isLoading} onClick={() => props.setNewEventClickedState(false)}>
            Cancelar
          </button>
        </div>

        <div className="EventMessage">
          {message.message ? (
            <p className={message.error ? 'CreateEventErrorMessage' : 'CreateEventSuccessMessage'}>
              {message.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
