import React, {useEffect} from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, Platform, Linking, I18nManager,TouchableOpacity,StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Settings from './settings';
import About from './about';
import ReleaseNotes from './releasenotes';
import Licensing from './licensing';
import Language from './language';
import Currency from './currency';
import EncryptStorage from './encryptStorage';
import LightningSettings from './lightningSettings';
import ElectrumSettings from './electrumSettings';
import TorSettings from './torSettings';
import Tools from './tools';
import GeneralSettings from './GeneralSettings';
import NetworkSettings from './NetworkSettings';
import NotificationSettings from './notificationSettings';
import DefaultView from './defaultView';
const SettingStack = () => {
  const theme = useTheme();

   
  useEffect(() => {
    
    console.log('aa')
    
  });

  

  const stack = createStackNavigator();


  return (
    <stack.Navigator>
      <stack.Screen name="Settings" component={Settings}  options={{ headerShown: false, animationEnabled: false }} />
      <stack.Screen name="GeneralSettings" component={GeneralSettings}  options={{ headerShown: false, animationEnabled: false }} />
      <stack.Screen name="About" component={About}  options={{ headerShown: false, animationEnabled: false }} />
      
    </stack.Navigator>
  );
};

export default SettingStack;