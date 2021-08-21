import React, { useContext, useEffect, useState } from 'react';
import { Platform, View, Keyboard, StatusBar, StyleSheet, Alert } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import {
  BlueFormMultiInput,
  BlueButtonLink,
  BlueFormLabel,
  BlueDoneAndDismissKeyboardInputAccessory,
  BlueButton,
  SafeBlueArea,
  BlueSpacing20,
} from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import Privacy from '../../blue_modules/Privacy';
import WalletImport from '../../class/wallet-import';
import loc from '../../loc';
import { isDesktop, isMacCatalina } from '../../blue_modules/environment';
import { BlueStorageContext } from '../../blue_modules/storage-context';

import { ArweaveWallet } from '../../class/wallets/arweave-wallet';

import { getAddress } from '../../helpers/request';
const fs = require('../../blue_modules/fs');

const WalletsImport = () => {
  const [isToolbarVisibleForAndroid, setIsToolbarVisibleForAndroid] = useState(false);
  const route = useRoute();
  const { isImportingWallet, addWallet,saveToDisk,setIsImportingWallet } = useContext(BlueStorageContext);
  const label = (route.params && route.params.label) || '';
  const triggerImport = (route.params && route.params.triggerImport) || false;
  const [importText, setImportText] = useState(label);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isKeyring, setIsKeyring] = useState(true);

  const styles = StyleSheet.create({
    root: {
      paddingTop: 40,
      backgroundColor: colors.elevated,
    },
    center: {
      flex: 1,
      marginHorizontal: 16,
      backgroundColor: colors.elevated,
    },
  });

  useEffect(() => {
    Privacy.enableBlur();
    Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setIsToolbarVisibleForAndroid(true));
    Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setIsToolbarVisibleForAndroid(false));
    return () => {
      Keyboard.removeListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide');
      Keyboard.removeListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow');
      Privacy.disableBlur();
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  

  const pickFile = async () => {

      const { data } = await fs.showFilePickerAndReadFileJson();
        console.log('pickFile')
            console.log(data);
                let a = await getAddress(data)

      // const w = {
      //     'label': 'Import wallet',
      //     'chain': 'arweave',
      //     'preferredBalanceUnit': 'PQD',
      //     'unconfirmed_balance': 0,
      //     'balance_human': 0,
      //     'type': 'arweave',
      //     'use_with_hardware_wallet': false,
      //     'key': data //JSON.parse(data)
      //   }



      // arweave = new ArweaveWallet(w);
      // let a = await arweave.getBalanceHuman();
      // console.log(a);

      //addWallet(arweave);
      //await saveToDisk();
      console.log('----->')
  }

  return (
    <SafeBlueArea style={styles.root}>
      <StatusBar barStyle="light-content" />
      <BlueSpacing20 />
      <BlueFormLabel>{loc.wallets.import_explanation}</BlueFormLabel>
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />
      <BlueSpacing20 />

      <BlueButton title={'Darg your key file or click to select on'} onPress={pickFile} testID="ScanImport" />

      <BlueSpacing20 />
      
    </SafeBlueArea>
  );
};

WalletsImport.navigationOptions = navigationStyle({}, opts => ({ ...opts, title: loc.wallets.import_title }));

export default WalletsImport;
