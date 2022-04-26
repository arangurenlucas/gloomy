import type { Event } from '../interfaces/Event';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
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