"use client";

import React, { PropsWithChildren } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

type TAuthContext = {
  user: IUserType | null;
};

export interface IUserType {
  email: string | null;
  uid: string | null;
}

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<TAuthContext>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = React.useState<IUserType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
