import { Timestamp } from 'firebase/firestore/lite';

export interface Event {
  eventName: string;
  description: string;
  eventHost: string;
  imageUrl: string;
  eventDate: Timestamp;
  expired: boolean;
  id: string;
}
