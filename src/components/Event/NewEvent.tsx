import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import '../Styles/newEventButton.css'
import CreateEvent from './CreateEvent';

function NewEvent() {
  const [newEventClicked, setNewEventClickedState] = useState<boolean>();
  console.log(newEventClicked);
  
  return (
    <div>
    <button className="newEventButton" onClick={() => setNewEventClickedState(!newEventClicked) }>
      <AiOutlinePlus className="newEventIcon" />
    </button>
    {/* {newEventClicked ? <CreateEvent /> : null } */}
    </div>
  );
}

export default NewEvent;