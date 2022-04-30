import { Timestamp } from 'firebase/firestore';

export interface Event {
  eventName: string;
  description: string;
  eventCategory: string;
  eventHost: string; 
  imageUrl: string; 
  eventDate: Timestamp; 
  expired: boolean;
  id?: string; 
}

export interface eventInfoType {
  eventName: string;
  description: string;
  eventCategory: string;
  eventDate: Timestamp;
}

export interface editEventType{
  id: string,
  eventName: string;
  eventDate: Timestamp;
  eventCategory: string;
  imageUrl: string;
  description: string;
}



