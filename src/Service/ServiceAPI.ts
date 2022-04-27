import type { Event } from '../interfaces/Event';
import { getRandomString } from './utils';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Initialize Cloud Firestore and storage
const db = getFirestore(app);
const storage = getStorage(app);

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

export function uploadImage(uid: string, image: File) {
  const imageRef = ref(storage, `eventImages/${uid}-${getRandomString(7)}`);

  return uploadBytes(imageRef, image);
}
