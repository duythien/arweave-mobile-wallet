import React, {useEffect} from 'react'

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
import SendConfirm from './send/confirm';
import SendSuccess from './send/success';


import ReceiveDetails from './receive/details';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator()



const HomeStack = ({navigation, route}) => {
  const theme = useTheme();
  

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'WalletsList';
    
    if ('WalletsList' == routeName) {
      navigation.setOptions({ tabBarVisible: true })
    } else {
      navigation.setOptions({ tabBarVisible: false })
    }
    //return () => { mountedRef.current = false }
  }, [navigation, route])

  return (
    <Stack.Navigator>
      <Stack.Screen name="WalletsList" component={WalletsList}  />
      <Stack.Screen name="AddWalletRoot" component={AddWallet} options={ImportWallet.navigationOptions(theme)} />
      <Stack.Screen name="ImportWallet" component={ImportWallet} options={ImportWallet.navigationOptions(theme)} />
      <Stack.Screen name="PleaseBackup" component={PleaseBackup} options={PleaseBackup.navigationOptions(theme)} />
      <Stack.Screen name="PleaseBackupQrcode" component={PleaseBackupQrcode}
        options={PleaseBackupQrcode.navigationOptions(theme)}
      />   
      <Stack.Screen name="WalletTransactions" component={WalletTransactions}  />
      <Stack.Screen name="SendDetails" component={SendDetails} />
      <Stack.Screen name="SendConfirm" component={SendConfirm} />
      <Stack.Screen name="SendSuccess" component={SendSuccess} />
      <Stack.Screen name="ReceiveDetails" component={ReceiveDetails} options={ReceiveDetails.navigationOptions(theme)} />
    </Stack.Navigator>
  )
}

export default HomeStack;
