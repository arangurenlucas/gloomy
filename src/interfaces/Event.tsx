import { Timestamp } from 'firebase/firestore';

export interface Event {
  eventName: string;
  description: string;
  eventCategory: string;
  imageUrl: string;
  eventDate: Timestamp;
  subscribers: string[];
  hostUid: string;
  id?: string;
}

export interface eventInfoType {
  eventName: string;
  description: string;
  eventCategory: string;
  eventDate: Timestamp;
}

export interface editEventType {
  id: string;
  eventName: string;
  eventDate: Timestamp;
  eventCategory: string;
  imageUrl: string;
  description: string;
}
