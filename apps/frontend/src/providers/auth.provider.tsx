"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { LogicError } from "@/helpers/errors/exceptions/login.exception";
import { IUserAuth } from "@/helpers/security/auth/user.auth";

type TUserAuth = {
  userAuth: IUserAuth;
  setUserAuth: Dispatch<SetStateAction<IUserAuth>>;
};

const UserAuthContext = createContext<TUserAuth | undefined>(undefined);

export const useUserAuth = () => {
  const userAuthContext = useContext<TUserAuth | undefined>(UserAuthContext);
  if (userAuthContext === undefined) {
    throw new LogicError("You need Auth Service inside all routes");
  }

  return userAuthContext;
};

export function UserAuthProvider({ children }: any) {
  const [userAuth, setUserAuth] = useState<IUserAuth>({});

  return (
    <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserAuthContext.Provider>
  );
}
