import { createContext, useReducer } from 'react';

const initState = [];

export const LogContext = createContext(initState);

export const LogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logReducer, initState);

  const insertMoneyLog = money => {
    dispatch({
      type: 'INSERT',
      payload: money,
    });
  };

  const buyProductLog = product => {
    dispatch({
      type: 'BUY',
      payload: product,
    });
  };

  const dropProductLog = product => {
    dispatch({
      type: 'DROP',
      payload: product,
    });
  };

  return (
    <LogContext.Provider
      value={{
        machineLog: state,
        insertMoneyLog,
        buyProductLog,
        dropProductLog,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

const logReducer = (state, action) => {
  switch (action.type) {
    case 'INSERT':
    case 'BUY':
    case 'DROP':
      state.push({
        id: state.length + 1,
        type: action.type,
        value: action.payload,
      });
      return [...state];
    case 'RETURN':
      return;
    default:
      return;
  }
};
