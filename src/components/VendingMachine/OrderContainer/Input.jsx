import { useEffect, useContext } from 'react';
import { MoneyContext } from 'context/MoneyContext';
import styled from 'styled-components';
import setLocalString from 'utils/setLocalString';
import calculateTotalMoney from 'utils/calculateTotalMoney';

export default function UserInput() {
  const { walletMoneyData, inputValue, setInputValue, inputInsertMoney } = useContext(MoneyContext);
  const totalMoney = calculateTotalMoney(walletMoneyData);

  const insertWalletMoney = num => {
    const insertLog = [];

    // 자동보정
    let money = Math.floor(num / 10) * 10;
    if (totalMoney < money) return walletMoneyData;

    walletMoneyData.forEach(item => {
      if (!Math.floor(money / item.count) || !item.amount) return;

      if (item.count * item.amount < money) {
        const 투입가능금액 = item.count * item.amount;
        insertLog.push({ ...item, amount: Math.floor(투입가능금액 / item.count) });
        money -= 투입가능금액;
        return;
      }

      insertLog.push({ ...item, amount: Math.floor(money / item.count) });
      money - item.count < item.count && money <= 0
        ? (money -= item.count)
        : (money -= item.count * Math.floor(money / item.count));
    });

    return insertLog;
  };

  const handleChange = e => {
    if (e.target.value.length > 6) return;
    setInputValue(setLocalString(e.target.value.replace(/[^0-9]/g, '')));
  };

  useEffect(() => {
    setInputValue(setLocalString(inputValue.replace(/[^0-9]/g, '')));
  }, [inputValue, setInputValue]);

  const handleClick = () => {
    if (totalMoney === 0) {
      setInputValue('');
      return;
    }

    const removeLocalString = Number(inputValue.replace(',', ''));
    inputInsertMoney(insertWalletMoney(removeLocalString));
    setInputValue('');
  };

  return (
    <InputContainer>
      <InputWrapper>
        <InputCost type="text" placeholder="0" value={inputValue} onChange={handleChange} />
        <span>원</span>
      </InputWrapper>
      <InputCostBtn onClick={handleClick}>투입</InputCostBtn>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const InputWrapper = styled.div`
  margin-right: 12px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.offWhite};
  box-shadow: 0 2px 2px 0 rgba(38, 38, 135, 0.1);

  span {
    ${({ theme }) => theme.fontStyles.xSmallBold};
  }
`;

const InputCost = styled.input`
  width: 80%;
  padding: 8px;
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.fontStyles.xSmallBold};
`;

const InputCostBtn = styled.button`
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray3};
  box-shadow: 0 2px 2px 0 rgba(38, 38, 135, 0.1);
  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fontStyles.xSmallBold};
`;
