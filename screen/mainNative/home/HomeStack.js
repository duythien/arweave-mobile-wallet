import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native';

import WalletsList from '../../wallets/list';
import WalletTransactions from '../../wallets/transactions';
import AddWallet from '../../wallets/add';
import ImportWallet from '../../wallets/import';
import WalletDetails from '../..//wallets/details';
import WalletExport from '../../wallets/export';
import PleaseBackup from '../../wallets/pleaseBackup';
import PleaseBackupQrcode from '../../wallets/pleaseBackupQrcode';
import SendDetails from './send/details';
import ReceiveDetails from './receive/details';

const AddWalletStack = createStackNavigator();
const AddWalletRoot = () => {
  const theme = useTheme();
  return (
    <AddWalletStack.Navigator>
      <AddWalletStack.Screen name="AddWallet" component={AddWallet} options={ImportWallet.navigationOptions(theme)} />
      <AddWalletStack.Screen name="ImportWallet" component={ImportWallet} options={ImportWallet.navigationOptions(theme)} />
      <AddWalletStack.Screen name="PleaseBackup" component={PleaseBackup} options={PleaseBackup.navigationOptions(theme)} />
      <AddWalletStack.Screen
        name="PleaseBackupQrcode"
        component={PleaseBackupQrcode}
        options={PleaseBackupQrcode.navigationOptions(theme)}
      />      
    </AddWalletStack.Navigator>
  );
};



const Tab = createStackNavigator()

const HomeTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen name="WalletsList" component={WalletsList}  />
      <Tab.Screen name="AddWalletRoot" component={AddWalletRoot} options={{ headerShown: false }} />
      <Tab.Screen name="WalletTransactions" component={WalletTransactions}  />
      <Tab.Screen name="SendDetails" component={SendDetails} options={SendDetails.navigationOptions(theme)} />
      <Tab.Screen name="ReceiveDetails" component={ReceiveDetails} options={ReceiveDetails.navigationOptions(theme)} />
    </Tab.Navigator>
  )
}


const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
