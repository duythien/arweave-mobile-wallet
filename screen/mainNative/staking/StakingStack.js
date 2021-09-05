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

const AddWalletStack = createStackNavigator();
const AddWalletRoot = () => {
  const theme = useTheme();
  return (
    <AddWalletStack.Navigator>
      <AddWalletStack.Screen name="AddWallet" 
        component={AddWallet}
      />
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

  return (
    <Tab.Navigator>
        <Tab.Screen name="WalletsList" component={WalletsList}  />
        <Tab.Screen name="AddWalletRoot" component={AddWalletRoot} options={{ headerShown: false }} />
        <Tab.Screen name="WalletTransactions" component={WalletTransactions}  />
    </Tab.Navigator>
  )
}


const Stack = createStackNavigator()

export default function StakingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
