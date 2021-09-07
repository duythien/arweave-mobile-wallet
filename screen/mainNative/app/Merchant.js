import React from 'react'

import { SafeAreaView, View, Image,Button,
 FlatList, StyleSheet, Text, StatusBar
} from 'react-native';

import {
  BlueButton,
  SafeBlueArea,
  BlueSpacing20,
  BlueFormLabel
} from '../../BlueComponents';

import { ListItem, Avatar } from 'react-native-elements';
import styled from 'styled-components/native'

const StyledText = styled.Text`
  color: palevioletred;
`
const StyledView = styled.View`
  background-color: papayawhip;
`

const list = [
  {
    name: 'File 01',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'File 02',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'File 03',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'File 04',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});





const Merchant = () => {

  const pickFile = () => {

      alert('TODO');
  }

  
  return (
    <SafeAreaView style={styles.container}>

      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <StyledView>
      <StyledText>You don't have merchant accounts. Some features are currently hidden and will only become available once you have merchant accounts.</StyledText>
      </StyledView>

    </SafeAreaView>
  );


}


export default Merchant;
