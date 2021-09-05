import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, useWindowDimensions, Dimensions, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Settings from '../settings/settings';
import About from '../settings/about';
import ReleaseNotes from '../settings/releasenotes';
import WalletsList from '../wallets/list';
import WalletTransactions from '../wallets/transactions';

const WalletScreen = () => {
  const theme = useTheme();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="WalletsList" component={WalletsList} options={WalletsList.navigationOptions(theme)} />
      <Stack.Screen name="WalletTransactions" component={WalletTransactions}  />
    </Stack.Navigator>
  );
};


export default WalletScreen;