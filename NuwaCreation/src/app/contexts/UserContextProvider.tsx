"use client";

import { createContext } from "react";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { User } from "@/app/lib/definitions.user";
import { useReducer } from "react";
import { useContext } from "react";


export const UserContext = createContext<User>(null as any);
export const UserDispatchContext = createContext(null as any);



export function UserProvider({ children, value }: {children: React.ReactNode, value: User}) {
  const [user, dispatch] = useReducer(
    userReducer,
    value as never
  );

  return (
    <UserContext.Provider value={user as any}>
      <UserDispatchContext.Provider value={dispatch as any}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useCharaListItem() {
  return useContext(UserContext);
}

export function useCharaListItemDispatch() {
  return useContext(UserDispatchContext);
}

function userReducer(value: User, action: any) {
  switch (action.type) {
    case 'mailcode': {
      // const charaList = getCharaList();
      // return charaList.filter((t) => t.uid !== action.payload.uid);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

