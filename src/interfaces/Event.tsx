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
