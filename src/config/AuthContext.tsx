import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { doc, DocumentData, getDoc, setDoc } from "@firebase/firestore";
import React, { createContext } from "react";
import { authContextInterface, signUpData, userInterface, callbackInterface } from "../types";
import { auth, db } from "./firebase";

const contextDefaultValues: authContextInterface = {
  loading: false,
  isLoggedIn: false,
  logInUser: () => {},
  logOutUser: () => {},
  signUpUser: () => {},
  currentUser: {
    firstName: "",
    lastName: "",
  },
};

export const AuthContext = createContext<authContextInterface>(contextDefaultValues);

export const AuthContextProvider = (props: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal;
}) => {
  const [isLoggedIn, setLoggedIn] = React.useState<Boolean>(false);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<{ firstName: string; lastName: string } | DocumentData>();

  const logInUser = (email: string, password: string, callback?: callbackInterface) => {
    const cb = callback && callback.cb;
    const err = callback && callback.err;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoggedIn(true);
        getDoc(doc(db, "users", res.user.uid)).then(({ data }) => {
          setCurrentUser(data as userInterface | DocumentData);
          cb && cb();
        });
      })
      .catch((e) => {
        setLoggedIn(false);
        alert(e.message);
        err && err();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOutUser = () => {
    setLoading(true);
    signOut(auth)
      .catch((e) => {
        setLoggedIn(false);
        alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUpUser = (data: signUpData, callback?: callbackInterface) => {
    const cb = callback && callback.cb;
    const err = callback && callback.err;
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          firstName: data.firstName,
          lastName: data.lastName,
        }).then(() => {
          logInUser(data.email, data.password, { cb });
        });
      })
      .then(() => {})
      .catch((e) => {
        err && err();
        alert(e.message);
      })
      .finally(() => {});
  };

  return <AuthContext.Provider value={{ loading, isLoggedIn, currentUser, logInUser, logOutUser, signUpUser }}>{props.children}</AuthContext.Provider>;
};
