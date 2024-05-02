'use client';

import { createContext, useContext, useReducer } from 'react';
import AlterMessage from './AlterMessage';

export const AmContext = createContext({message: '', isOpen: false});
export const AmDispatchContext = createContext(null as any);

export function AlterMessageContextProvider({ children, message, isOpen }: {children: React.ReactNode, message?: string, isOpen?: boolean}) {
  const [amObj, dispatch] = useReducer(
    amReducer,
    {
      message: '',
      isOpen: false
    }
  );

  return (
    <AmContext.Provider value={amObj}>
      <AmDispatchContext.Provider value={dispatch as any}>
        <AlterMessage isOpen={amObj.isOpen} message={amObj.message} onClose={() => {
          dispatch({
            type: "close",
            payload: 'success',
          })
        }} />
        {children}
      </AmDispatchContext.Provider>
    </AmContext.Provider>
  );
}

export function useAm() {
  return useContext(AmContext);
}

export function useAmDispatch() {
  return useContext(AmDispatchContext);
}

function amReducer(value: {message: string, isOpen: boolean}, action: any) {
  switch (action.type) {
    case 'open': {
      return {
        message: action.payload,
        isOpen: true,
      }
    }
    case 'close': {
      return {
        message: "",
        isOpen: false,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

