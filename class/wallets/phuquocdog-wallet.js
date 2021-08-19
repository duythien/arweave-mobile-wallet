
const Alice = '5DFignjD1nYb11saiStmZnJTno9yTW1RGfmXLhbyaQCEoSFq';
import { ApiPromise, WsProvider } from '@polkadot/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export class PhuquocdogWallet {

  constructor(props) {
    this.props = props;
    this.balanceHuman = '0 PQD';
  }

  async connect (account) {
      const provider = new WsProvider(process.env.WS || 'wss://node.phuquoc.dog');
      const api = await ApiPromise.create({provider});
      const { nonce, data: balance } = await api.query.system.account(account);
      return balance;
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
    return this.props.secret
  }
  
  getIsFailure() {
    return 1;
  }
  getLabel() {
    // no longer used in wallets carousel
    return this.props.label? this.props.label : 'Your PQD';
  }
  getHideTransactionsInWalletsList() {
    return '123';
  }
  getPreferredBalanceUnit() {
    return 'getPreferredBalanceUnit';
  }
  getID() {
    return this.props.address;
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
