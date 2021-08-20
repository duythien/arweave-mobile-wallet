import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, BackHandler, StatusBar,AppState } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BlueButton, BlueCopyTextToClipboard, BlueSpacing20, BlueTextCentered, SafeBlueArea } from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import Privacy from '../../blue_modules/Privacy';
import loc from '../../loc';
import { BlueStorageContext } from '../../blue_modules/storage-context';
const fs = require('../../blue_modules/fs');
import AsyncStorage from '@react-native-async-storage/async-storage';

const PleaseBackupQrcode = () => {
  const { wallets } = useContext(BlueStorageContext);
  const { walletID } = useRoute().params;
  const wallet = wallets.find(w => w.getID() === walletID);
  const navigation = useNavigation();
  const [isShareButtonTapped, setIsShareButtonTapped] = useState(false);
  const { colors } = useTheme();
  const [qrCodeSize, setQRCodeSize] = useState(90);
  const handleBackButton = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
    return true;
  }, [navigation]);
  const styles = StyleSheet.create({
    root: {
      backgroundColor: colors.elevated,
    },
    scrollViewContent: {
      flexGrow: 1,
      backgroundColor: colors.elevated,
      justifyContent: 'center',

      alignItems: 'center',
      padding: 20,
    },
    qrCodeContainer: { borderWidth: 6, borderRadius: 8, borderColor: '#FFFFFF' },
  });
  
  useEffect(() => { 
    BackHandler.addEventListener('click', function() {
            console.log('-------->hardwareBackPress----')

      // Bây giờ thì phần handler của bạn sẽ được lắng nghe và xử lý đầu tiên,
      // do nó đang được định nghĩa nằm trong giai đoạn Capturing.
      // Vì thế nó sẽ handle tất cả những event click từ React components của bạn
    }, { capture: true });
    //Privacy.enableBlur();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

   useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(walletID);
        if (value !== null) {
          setWallet(new ArweaveWallet(value));
        }
      } catch (error) {
        console.log(error)
        console.log('error wallet id: ' + walletID)
        // Error retrieving data
      }
    })();
  }, []);


  const exportJsonFile = async () => {
    setIsShareButtonTapped(true);
    setTimeout(() => {
      fs.writeFileAndExport(wallet.getLabel() + '.json', wallet.getKeySecret()).finally(() => {
        setIsShareButtonTapped(false);
      });
    }, 10);

    setTimeout(() => {
      navigation.dangerouslyGetParent().pop();
    }, 10000);
    //

  };


  const pop = useCallback(() => {
    setIsShareButtonTapped(true);

    setTimeout(() => {
      fs.writeFileAndExport(wallet.getLabel() + '.json', wallet.getKeySecret()).finally(() => {
        setIsShareButtonTapped(false);
      });
    }, 10);

    navigation.dangerouslyGetParent().pop();
    return true;
  }, [navigation]);

  const onLayout = e => {
    const { height, width } = e.nativeEvent.layout;
    setQRCodeSize(height > width ? width - 40 : e.nativeEvent.layout.width / 1.5);
  };
  return (
    <SafeBlueArea style={styles.root} onLayout={onLayout}>
      <StatusBar barStyle="light-content" />
      <ScrollView centerContent contentContainerStyle={styles.scrollViewContent}>
        <View>
          <BlueTextCentered>{loc.pleasebackup.text}</BlueTextCentered>
          <BlueSpacing20 />
        </View>
        <BlueSpacing20 />
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={wallet.getSecret()}
            logo={require('../../img/qr-code.png')}
            logoSize={90}
            color="#000000"
            logoBackgroundColor={colors.brandingColor}
            backgroundColor="#FFFFFF"
            ecl="H"
            size={qrCodeSize}
          />
        </View>
        <BlueCopyTextToClipboard text={wallet.getSecret()} />
        <BlueSpacing20 />
        <BlueButton onPress={exportJsonFile} title={loc.pleasebackup.ok} />
      </ScrollView>
    </SafeBlueArea>
  );
};

PleaseBackupQrcode.navigationOptions = navigationStyle(
  {
    closeButton: true,
    headerLeft: null,
    headerRight: null,
    gestureEnabled: false,
    swipeEnabled: false,
  },
  opts => ({ ...opts, title: loc.pleasebackup.title }),
);

export default PleaseBackupQrcode;
