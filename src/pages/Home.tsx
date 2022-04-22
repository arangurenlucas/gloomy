import { useState } from 'react';
import EventCard from '../components/Event/EventCard';
import NewEvent from '../components/Event/NewEvent';
import type { eventType } from '../interfaces/eventType';
import '../components/Event/event.css';

const eventsList: eventType[] = [
  {
    profilePhoto: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Organizador 1',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    title: 'Evento 1',
    category: 'Categoria 1',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium, recusandae itaque, eaque est aliquam possimus cupiditate, officia consequatur sint alias non? Tempora expedita ratione dignissimos necessitatibus iure eligendi quis.',
    date: '01/01/2020',
  },
  {
    profilePhoto: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Organizador 1',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque itaque ducimus corrupti vel sint, sed maxime doloremque assumenda illo, velit perferendis pariatur qui ut asperiores suscipit adipisci labore totam fugiat.',
    category: 'Categoria 1',
    description: 'Descripción larga del evento 1',
    date: '01/01/2020',
  },
  {
    profilePhoto: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Organizador 1',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    title: 'Evento 1',
    category: 'Categoria 1',
    description: 'Descripción larga del evento 1',
    date: '01/01/2020',
  },
  {
    profilePhoto: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Organizador 1',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    title: 'Evento 1',
    category: 'Categoria 1',
    description: 'Descripción larga del evento 1',
    date: '01/01/2020',
  }
];

function Home() {
  return (
    <div className="homeContainer">
      <div className="center">
        {eventsList.map((event: eventType) => (
          <EventCard
            key={event.organizer && event.title}
            profilePhoto={event.profilePhoto}
            organizer={event.organizer}
            img={event.img}
            title={event.title}
            category={event.category}
            description={event.description}
            date={event.date}
          />
        ))}
        <NewEvent />
      </div>
    </div>
  );
}
export default Home;
