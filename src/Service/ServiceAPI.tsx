import type { Event } from '../interfaces/Event';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrOdw3e307VdoDUUdOLFfsNqQLqSseNuI',
  authDomain: 'gloomy-a76a2.firebaseapp.com',
  projectId: 'gloomy-a76a2',
  storageBucket: 'gloomy-a76a2.appspot.com',
  messagingSenderId: '487186692526',
  appId: '1:487186692526:web:12fcd722c2228c9278303f'
};

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
