
const Alice = '5DFignjD1nYb11saiStmZnJTno9yTW1RGfmXLhbyaQCEoSFq';
import AsyncStorage from '@react-native-async-storage/async-storage';


export class ArweaveWallet {

  constructor(props) {
    this.props = props;
    this.balanceHuman = '0 AR';
  }

  async connect (account) {
      
  }


  getBalance() {
    return 10;

  }

  setBalanceHuman(b){
    if (b != 0) {
      return this.balanceHuman = b;
    }
  }

  async getBalanceHuman() {

    try {
      const result = await this.connect(this.props.address);

      if (result) {
        this.setBalanceHuman(result.free.toHuman());

      }
    } catch (_) {}
  
    return this.balanceHuman;
  }
  latestTransactionText() {
    return '0xf6c55dcd3414664b9b3f61aeedbc304ea391cbc40ff2590ea094896c4587f67c';
  }
  getSecret() {
    return '123'
  }
  
  getIsFailure() {
    return 1;
  }
  getLabel() {
    // no longer used in wallets carousel
    return this.props.label? this.props.label : 'Your Arweave';
  }
  getHideTransactionsInWalletsList() {
    return '123';
  }
  getPreferredBalanceUnit() {
    return 'getPreferredBalanceUnit';
  }
  getID() {
    return this.props.key.n;
  }
  getLatestTransactionTime() {
    return 'getLatestTransactionTime'
  }
  getTransactions() {
    return 'getTransactions'
  }
  timeToRefreshBalance() {
    return 'timeToRefreshBalance';
  }
  allowSend(){
    return 'allowSend'
  }
  allowReceive() {
    return 'allowReceive';
  }
  fetchBalance() {
    return 1;
  }
  getPreferredBalanceUnit() {
    return 'getPreferredBalanceUnit()'
  }
  fetchTransactions() {
    return 'fetchTransactions'
  }
  getLastTxFetch(){
    return 'getLastTxFetch';
  }
  useWithHardwareWalletEnabled () {
    return 'wallet.useWithHardwareWalletEnabled'
  }
  allowXpub () {
    return 'wallet.allowXpub'
  }
  allowSignVerifyMessage() {
    return 'allowSignVerifyMessage()'
  }
}
