import { createContext, useReducer } from 'react';
import WALLET_MONEY_DATA from 'mock/Wallet';
import MACHINE_MONEY_DATA from 'mock/Machine';

const initState = {
  walletMoneyData: WALLET_MONEY_DATA,
  insertMoneyData: MACHINE_MONEY_DATA,
};

export const MoneyContext = createContext(initState);

export const MoneyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moneyReducer, initState);

  const insertMoney = money => {
    dispatch({
      type: 'INSERT_MONEY',
      payload: money,
    });
  };

  return (
    <MoneyContext.Provider
      value={{
        walletMoneyData: state.walletMoneyData,
        insertMoneyData: state.insertMoneyData,
        insertMoney,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

const moneyReducer = (state, action) => {
  switch (action.type) {
    case 'INSERT_MONEY':
      const updateWalletMoney = state.walletMoneyData.map(money => {
        return money.count === action.payload
          ? (money = { ...money, amount: --money.amount })
          : money;
      });

      const updateMachineMoney = state.insertMoneyData.map(money => {
        return money.count === action.payload
          ? (money = { ...money, amount: ++money.amount })
          : money;
      });

      return { walletMoneyData: updateWalletMoney, insertMoneyData: updateMachineMoney };
    case 'RETURN_MONEY':
      return;
    default:
      return state;
  }
};
