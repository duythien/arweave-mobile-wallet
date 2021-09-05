import React, { useLayoutEffect } from 'react'

import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import HomeStack from './mainNative//home/HomeStack';
import AppStack from './mainNative//app/AppStack';
import DappStack from './mainNative//dapp/DappStack';
import StakingStack from './mainNative/staking/StakingStack';


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
	            size = 25;

	            // You can return any component that you like here!
	            return <Ionicons name={iconName} size={size} color={color} />;
	          },
        })} 
        tabBarOptions={{
          activeTintColor: '#080808',
          inactiveTintColor: '#909090',
        }}

    >
    	<Tab.Screen component={HomeStack} name="Home" options={{ headerShown: false }} />
      <Tab.Screen component={DappStack} name="Dapp" options={{ headerShown: false }} />
      <Tab.Screen component={AppStack}  name="Apps" options={{ headerShown: false }} />
    	<Tab.Screen component={StakingStack} name="Staking" options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default MainTabs;