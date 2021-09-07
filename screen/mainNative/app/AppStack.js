import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


import Merchant from './Merchant';
import IpfsUser from './IpfsUser';
import StorageUser from './StorageUser';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`
const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {

  return (
    <Container edges={['top']}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { textTransform: 'capitalize' },
          indicatorStyle: {
            width: '15%',
            backgroundColor: 'black',
            left: '17.5%'
          }
        }}>
        <Tab.Screen component={StorageUser} name="Storage" />
        <Tab.Screen component={IpfsUser} name="IPFS" />
        <Tab.Screen component={Merchant} name="Merchant" />
        <Tab.Screen component={StorageUser} name="Order" />

      </Tab.Navigator>
    </Container>
  )
  
}


const Stack = createStackNavigator()

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
