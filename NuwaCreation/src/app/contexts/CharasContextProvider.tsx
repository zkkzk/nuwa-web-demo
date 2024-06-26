'use client';

import { createContext, useContext, useReducer } from 'react';
import { TypeCharaListItem } from '@/app/lib/definitions';
import { getCharaList, pushCharaList } from '@/app/lib/utils';

export const CharasContext = createContext<TypeCharaListItem>(null as any);
export const CharaDispatchContext = createContext(null as any);

export function CharaProvider({ children, value }: {children: React.ReactNode, value: TypeCharaListItem}) {
  const [charaListItem, dispatch] = useReducer(
    charaListItemReducer,
    value as never
  );

  return (
    <CharasContext.Provider value={charaListItem as any}>
      <CharaDispatchContext.Provider value={dispatch as any}>
        {children}
      </CharaDispatchContext.Provider>
    </CharasContext.Provider>
  );
}

export function useCharaListItem() {
  return useContext(CharasContext);
}

export function useCharaListItemDispatch() {
  return useContext(CharaDispatchContext);
}

function charaListItemReducer(value: TypeCharaListItem, action: any) {
  switch (action.type) {
    case 'changed': {
      const charaList = getCharaList();
      const newCharaList = charaList.map((t) => {
        if (t.uid === action.payload.uid) {
          return action.payload;
        } else {
          return t;
        }
      });
      pushCharaList(newCharaList)
      return action.payload
    }
    case 'deleted': {
      const charaList = getCharaList();
      return charaList.filter((t) => t.uid !== action.payload.uid);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

