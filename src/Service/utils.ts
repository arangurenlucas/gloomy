import { Timestamp } from 'firebase/firestore';

export function toStringDate(timeStamp: Timestamp) {
  //TimeStamp -> Date
  let date: Date = new Date(timeStamp.seconds * 1000);
  //Get day
  let dd: string = date.getDate().toString();
  //Get month
  let mm: string = (date.getMonth() + 1).toString();
  //Get year
  let yyyy = date.getFullYear();
  //Add zero if day or month is less than 10
  if (Number(dd) < 10) {
    dd = '0' + dd;
  }
  if (Number(mm) < 10) {
    mm = '0' + mm;
  }
  return dd + '/' + mm + '/' + yyyy;
}
