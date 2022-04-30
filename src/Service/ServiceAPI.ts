import type { Event } from '../interfaces/Event';
import type { editEventType } from '../interfaces/Event';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getEvents() {
  return getDocs(collection(db, 'events'));
}

export function addEvent(newEvent: Event) {
  return addDoc(collection(db, 'events'), newEvent);
}

export function deleteEvent(eventId: string) {
  const eventToDelete = doc(collection(db, 'events'), eventId);
  return deleteDoc(eventToDelete);
}

export function updateEvent(eventId: string, eventUpdate: editEventType) {
  const eventRef = doc(collection(db, 'events'), eventId);
  const { eventName, description, eventDate, imageUrl, eventCategory } = eventUpdate;

  return updateDoc(eventRef, {
    eventName,
    description,
    eventDate,
    eventCategory,
    imageUrl
  });
}