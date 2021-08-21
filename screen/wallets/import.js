import React, { useContext, useEffect, useState } from 'react';
import { Platform, View, Keyboard, StatusBar, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(true);

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
      justifyContent: 'space-around'
    },
    horizontal: {
      backgroundColor: colors.elevated
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
    },
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
      const address = await getAddress(JSON.parse(data));

      const w = {
        'label': label,
        'chain': 'arweave',
        'unconfirmed_balance': 0,
        'type': 'arweave',
        'key': data,
        'address': address
      }
    
    arweave = new ArweaveWallet(w);
    addWallet(arweave);
    await saveToDisk();
    setIsLoading(false);
    setTimeout(() => {
      navigation.dangerouslyGetParent().pop();
    }, 1000);

  }

  return !isLoading ? (
    <View style={[styles.loading, styles.horizontal]}>
      <ActivityIndicator />
    </View>
    ) : (
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
  )
};

WalletsImport.navigationOptions = navigationStyle({}, opts => ({ ...opts, title: loc.wallets.import_title }));

export default WalletsImport;
