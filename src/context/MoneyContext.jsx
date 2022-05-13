import { createContext, useReducer } from 'react';
import WALLET_MONEY_DATA from 'mock/Wallet';

const initState = {
  walletMoneyData: WALLET_MONEY_DATA,
  insertMoneyData: 0,
};

export const MoneyContext = createContext(initState);

export const MoneyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moneyReducer, initState);

  const buttonInsertMoney = money => {
    dispatch({
      type: 'BUTTON_INSERT_MONEY',
      payload: money,
    });
  };

  return (
    <MoneyContext.Provider
      value={{
        walletMoneyData: state.walletMoneyData,
        insertMoneyData: state.insertMoneyData,
        buttonInsertMoney,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

const moneyReducer = (state, action) => {
  switch (action.type) {
    case 'BUTTON_INSERT_MONEY':
      const updateWalletMoney = state.walletMoneyData.map(money => {
        return money.count === action.payload
          ? (money = { ...money, amount: --money.amount })
          : money;
      });

      const updateMachineMoney = state.insertMoneyData + action.payload;

      return { walletMoneyData: updateWalletMoney, insertMoneyData: updateMachineMoney };
    case 'RETURN_MONEY':
      return;
    default:
      return state;
  }
};
