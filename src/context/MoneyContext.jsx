import { createContext, useReducer } from 'react';
import WALLET_MONEY_DATA from 'mock/Wallet';
import calculateTotalMoney from 'utils/calculateTotalMoney';

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

  const inputInsertMoney = money => {
    dispatch({
      type: 'INPUT_INSERT_MONEY',
      payload: money,
    });
  };

  const buyProduct = product => {
    dispatch({
      type: 'BUY_PRODUCT',
      payload: product,
    });
  };

  const returnMoney = money => {
    dispatch({
      type: 'RETURN_MONEY',
      payload: money,
    });
  };

  return (
    <MoneyContext.Provider
      value={{
        walletMoneyData: state.walletMoneyData,
        insertMoneyData: state.insertMoneyData,
        buttonInsertMoney,
        inputInsertMoney,
        buyProduct,
        returnMoney,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

const moneyReducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'BUTTON_INSERT_MONEY':
      const updateWalletMoney = state.walletMoneyData.map(money => {
        return money.unit === action.payload ? { ...money, amount: money.amount - 1 } : money;
      });

      const updateMachineMoney = state.insertMoneyData + action.payload;

      return { walletMoneyData: updateWalletMoney, insertMoneyData: updateMachineMoney };
    case 'INPUT_INSERT_MONEY':
      const updateWalletMoney2 = newState.walletMoneyData.map(money => {
        action.payload.forEach(el => {
          el.unit === money.unit && (money = { ...money, amount: money.amount - el.amount });
        });

        return money;
      });

      const updateMachineMoney2 = newState.insertMoneyData + calculateTotalMoney(action.payload);

      return { walletMoneyData: updateWalletMoney2, insertMoneyData: updateMachineMoney2 };
    case 'BUY_PRODUCT':
      const updateInsertMoney = state.insertMoneyData - action.payload;
      return { ...state, insertMoneyData: updateInsertMoney };
    case 'RETURN_MONEY':
      const getChange = newState.walletMoneyData.map(money => {
        action.payload.forEach(el => {
          el.unit === money.unit && (money = { ...money, amount: money.amount + el.amount });
        });
        return money;
      });

      return { walletMoneyData: getChange, insertMoneyData: 0 };
    default:
      throw new Error();
  }
};
