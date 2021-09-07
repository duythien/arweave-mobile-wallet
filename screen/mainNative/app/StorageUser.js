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

const list = [
  {
    name: 'File 01',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Crust'
  },
  {
    name: 'Image 01',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Polkadot'
  },
  {
    name: 'File 02',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Bitcoin'
  },
  {
    name: 'Image 02',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Phu Quoc Dog'
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



const StorageUser = () => {

  const pickFile = () => {
    alert('TODO');

  }

 

  return (
    <SafeAreaView style={styles.container}>
      <BlueSpacing20 />
            <Button title={'Darg your file to upload'} onPress={pickFile} testID="ScanImport" />

            <BlueSpacing20 />
      <BlueSpacing20 />

      <BlueFormLabel>List Files</BlueFormLabel>
            <BlueSpacing20 />

      <View>
        {
          list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </SafeAreaView>
  );


}


export default StorageUser;
