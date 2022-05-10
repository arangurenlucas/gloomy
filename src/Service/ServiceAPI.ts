import type { Event, editEventType } from '../interfaces/Event';
import type { NewUser } from '../interfaces/User';
import { getRandomString } from './utils';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { ref, getStorage, uploadBytes } from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Initialize Cloud Firestore and storage
const db = getFirestore(app);
const storage = getStorage(app);

export function getEvents() {
  return getDocs(collection(db, 'events'));
}

export function getUsers() {
  return getDocs(collection(db, 'users'));
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

export function updateSubscription(eventId: string, userId: string, subscription: boolean) {
  const eventRef = doc(collection(db, 'events'), eventId);
  if (subscription) {
    return updateDoc(eventRef, {
      subscribers: arrayUnion(userId)
    });
  }
  return updateDoc(eventRef, {
    subscribers: arrayRemove(userId)
  });
}

export function uploadImage(uid: string, image: File) {
  const imageRef = ref(storage, `eventImages/${uid}-${getRandomString(7)}`);

  return uploadBytes(imageRef, image);
}

export function createUser(uid: string, newUser: NewUser) {
  return setDoc(doc(db, 'users', uid), newUser);
}

export function getUserData(uid: string) {
  const docRef = doc(db, 'users', uid);
  return getDoc(docRef);
}
