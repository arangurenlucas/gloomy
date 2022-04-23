import '../Styles/newEventScreen.css';
// import type { eventType } from "../../interfaces/eventType";

export default function CreateEvent() {
  return (
    <div className="newEventScreen">
      <p>Nombre</p>
      <input type="text" />
      <p>Categoria</p>
      <input type="text" />
      <p>Descripción</p>
      <input type="text" />
      <p>Fecha</p>
      <input type="text" />
      <button>Agregar</button>
    </div>
  );
}
