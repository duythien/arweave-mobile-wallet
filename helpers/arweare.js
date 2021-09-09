const formatBalance = (balance) => {
	return balance + 'AR';
}
const formatAmountFiat = (balance) => {
  return balance*52.05;
}

export {
	formatBalance,
  formatAmountFiat
}
