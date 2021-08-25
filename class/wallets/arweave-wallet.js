
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAddress, getBalance, getLastTransactionID} from '../../helpers/request';

export class ArweaveWallet {

  constructor(props) {
    this.props = props;
    this.balanceHuman = '0 AR';
    this.userHasSavedExport = false;
  }


  setBalanceHuman(b){
    return this.balanceHuman = b;
  }

  async getBalance(){
    try {
      const result = await getBalance(this.getAddress());
      if (result) {
        return result;
      }
    } catch (e) {
      console.log(e)
    }
    return 0;
  }

  async getBalanceHuman() {

    try {
      const result = await getBalance(this.getAddress());
      if (result) {
        this.setBalanceHuman(result + 'AR ');

      }
    } catch (e) {
      console.log(e)
    }
  
    return this.balanceHuman;
  }
  
  async getLastTransactionID() {
    try {
      const result = await getLastTransactionID(this.getAddress());
      if (result) {
        return result;
      }
    } catch (e) {
      console.log(e)
    }
    return 'Never';
  }
  getAddress() {
    return this.props.address;
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
    return this.props.address;
  }
  getLatestTransactionTime() {
    return 'getLatestTransactionTime'
  }
  getTransactions() {
    return []
  }
  timeToRefreshBalance() {
    return 'timeToRefreshBalance';
  }
  allowSend(){
    return true
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
  getUserHasSavedExport() {
    return
  }
  setUserHasSavedExport(v){
    this.setUserHasSavedExport = v
  }
  getType() {
    return this.props.type;
  }
  allowCosignPsbt() {
    return false;
  }
  /**
   * Fetches UTXO from API. Returns VOID.
   *
   * @return {Promise.<void>}
   */
  async fetchUtxo() {
    try {
      return 
      
    } catch (Error) {
      console.warn(Error);
    }
  }
}
