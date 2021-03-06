import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import './newEventButton.css'
import CreateEvent from './CreateEvent';

function NewEvent() {
  const [newEventClicked, setNewEventClickedState] = useState<boolean>();
  
  return (
    <div>
    <button className="newEventButton" onClick={() => setNewEventClickedState(!newEventClicked) }>
      <AiOutlinePlus className="newEventIcon" />
    </button>
    {newEventClicked ? <CreateEvent newEventClicked = { newEventClicked } setNewEventClickedState = { setNewEventClickedState}  /> : null } 
    </div>
  );
}

export default NewEvent;