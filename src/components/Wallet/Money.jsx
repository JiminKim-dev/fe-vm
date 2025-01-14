import { useContext } from 'react';
import { LogContext } from 'context/LogContext';
import { MoneyContext } from 'context/MoneyContext';

import styled, { css } from 'styled-components';
import setLocalString from 'utils/setLocalString';

const Money = ({ info }) => {
  const { insertMoneyLog } = useContext(LogContext);
  const { buttonInsertMoney } = useContext(MoneyContext);

  const decrease = () => {
    if (info.amount === 0) return;
    buttonInsertMoney(info.unit);
    insertMoneyLog([{ ...info, amount: 1 }]);
  };

  return (
    <MoneyWrapper>
      <span>{setLocalString(info.unit)}원</span>
      <PushBtn onClick={decrease} amount={info.amount}>
        {info.amount}개
      </PushBtn>
    </MoneyWrapper>
  );
};

const MoneyWrapper = styled.div`
  display: flex;
  border: 1px solid transparent;

  span {
    padding: 8px;
    width: 70%;
    background: ${({ theme }) => theme.colors.gray4};
    ${({ theme }) => theme.fontStyles.smallBold};
    cursor: default;
  }
`;

const PushBtn = styled.button`
  width: 30%;
  padding: 8px 4px;
  ${({ theme }) => theme.fontStyles.smallRegular};

  ${({ amount }) =>
    amount >= 1
      ? css`
          background: ${({ theme }) => theme.colors.orange};
        `
      : css`
          background: ${({ theme }) => theme.colors.gray3};
          cursor: default;
        `};
`;

export default Money;
