import { DocumentData } from "@firebase/firestore/dist/lite";

export interface signUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface userInterface {
  firstName: string;
  lastName: string;
  email: string;
}

export interface callbackInterface {
  cb?: VoidFunction;
  err?: VoidFunction;
}

export interface authContextInterface {
  loading: Boolean;
  isLoggedIn: Boolean;
  currentUser: userInterface | DocumentData | undefined;
  signUpUser: (data: signUpData, callback?: callbackInterface) => void;
  logInUser: (email: string, password: string, callback?: callbackInterface) => void;
  logOutUser: () => void;
}

export interface ipDataInterface {
  ip_address: string;
  city: string;
  country: string;
  continent: string;
  longitude: number;
  latitude: number;
  region: string;
  security: {
    is_vpn: boolean;
  };
  timezone: {
    name: string;
    abbreviation: string;
    gmt_offset: number;
    current_time: string;
  };
}
