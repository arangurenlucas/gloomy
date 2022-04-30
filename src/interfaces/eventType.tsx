import { Timestamp } from "firebase/firestore/lite";

export interface eventType {
  profilePhoto: string;
  organizer: string;
  img: string;
  title: string;
  category: string;
  description: string;
  date: Timestamp;
}
export interface eventHeaderType {
  profilePhoto: string;
  organizer: string;
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
