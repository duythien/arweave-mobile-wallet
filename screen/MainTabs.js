import React, { useLayoutEffect } from 'react'

import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import DappScreen from './mainNative/DappScreen';
import WalletScreen from './mainNative/WalletScreen';


const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator 

       	screenOptions={({ route }) => ({
          	tabBarIcon: ({ focused, color, size }) => {
	            let iconName;

	            if (route.name === 'Home') {
	              iconName = 'home';
	            } 

	            if (route.name === 'Dapp') {
	              iconName = 'md-logo-firefox';
	            }
	            if (route.name === 'Staking') {
	              iconName = 'file-tray-stacked';
	            }
	            if (route.name === 'Apps') {
	              iconName = 'apps-outline';
	            }
	            size = 30;

	            // You can return any component that you like here!
	            return <Ionicons name={iconName} size={size} color={color} />;
	          },
        })} 
        tabBarOptions={{
          activeTintColor: '#080808',
          inactiveTintColor: '#909090',
        }}

    >
    	<Tab.Screen component={WalletScreen} name="Home" options={{ headerShown: false }} />
      	<Tab.Screen component={DappScreen} name="Dapp" options={{ headerShown: false }} />
      	<Tab.Screen component={WalletScreen} name="Apps" options={{ headerShown: false }} />
    	<Tab.Screen component={WalletScreen} name="Staking" options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default MainTabs;