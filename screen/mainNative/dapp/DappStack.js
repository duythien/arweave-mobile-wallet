import React, {useEffect} from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, Platform, Linking, I18nManager,TouchableOpacity,StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LappBrowser from '../../screen/lnd/browser';


const DappStack = () => {
  const theme = useTheme();

   
  useEffect(() => {
    // (async () => {
    //   Linking.openURL('https://bluewallet.io/marketplace-btc/');
    // })();
    
  });

  const stack = createStackNavigator();


  return (
    <stack.Navigator {...(Platform.OS === 'android' ? { screenOptions: defaultScreenOptions } : null)}>
      <stack.Screen
        name="LappBrowser"
        component={LappBrowser}
        initialParams={{ walletID: 1}}
        options={LappBrowser.navigationOptions(theme)} />
    </stack.Navigator>
  );
};

export default DappStack;