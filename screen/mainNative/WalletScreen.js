import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, useWindowDimensions, Dimensions, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Settings from '../settings/settings';
import About from '../settings/about';
import ReleaseNotes from '../settings/releasenotes';
import WalletsList from '..//wallets/list';



const WalletScreen = () => {
  const theme = useTheme();
  const WalletsStack = createStackNavigator();

  return (
    <WalletsStack.Navigator {...(Platform.OS === 'android' ? { screenOptions: defaultScreenOptions } : null)}>
      <WalletsStack.Screen name="WalletsList" component={WalletsList} options={WalletsList.navigationOptions(theme)} />
    </WalletsStack.Navigator>
  );
};


export default WalletScreen;