const calculateTotalMoney = moneyData => {
  return moneyData.reduce((acc, cur) => acc + cur.count * cur.amount, 0);
};
export default calculateTotalMoney;
