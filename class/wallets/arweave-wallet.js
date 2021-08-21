
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAddress} from '../../helpers/request';

export class ArweaveWallet {

  constructor(props) {
    this.props = props;
    this.balanceHuman = '0 AR';
  }

  async connect (account) {
      

  }

  // getAddress() {

  // }
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
      const result = await getAddress(this.props.key);
      console.log(result);

      if (result) {
        this.setBalanceHuman(result.free.toHuman());

      }
    } catch (e) {
      console.log(e)
    }
  
    return this.balanceHuman;
  }
  latestTransactionText() {
    return '0xf6c55dcd3414664b9b3f61aeedbc304ea391cbc40ff2590ea094896c4587f67c';
  }
  getLastTransactionID() {

  }
  getSecret() {

    const myJSON = JSON.stringify(this.props.key);
    return this.props.key.kty;
  }
  getKeySecret() {

    //const myJSON = JSON.stringify(this.props.key);
    return this.props.key;
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
