export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface NewUser {
  email: string;
  displayName: string;
  photoURL: string;
}

export interface EmailAndPasswordUser {
  displayName: string;
  email: string;
  password: string;
  photoURL: string;
}
