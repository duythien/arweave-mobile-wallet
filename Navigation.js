import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, useWindowDimensions, Dimensions, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Settings from './screen/settings/settings';
import About from './screen/settings/about';
import ReleaseNotes from './screen/settings/releasenotes';
import Licensing from './screen/settings/licensing';
import Selftest from './screen/selftest';
import Language from './screen/settings/language';
import Currency from './screen/settings/currency';
import EncryptStorage from './screen/settings/encryptStorage';
import PlausibleDeniability from './screen/plausibledeniability';
import LightningSettings from './screen/settings/lightningSettings';
import ElectrumSettings from './screen/settings/electrumSettings';
import TorSettings from './screen/settings/torSettings';
import Tools from './screen/settings/tools';
import GeneralSettings from './screen/settings/GeneralSettings';
import NetworkSettings from './screen/settings/NetworkSettings';
import NotificationSettings from './screen/settings/notificationSettings';
import DefaultView from './screen/settings/defaultView';

import WalletsList from './screen/wallets/list';
import WalletTransactions from './screen/wallets/transactions';
import AddWallet from './screen/wallets/add';
import WalletsAddMultisig from './screen/wallets/addMultisig';
import WalletsAddMultisigStep2 from './screen/wallets/addMultisigStep2';
import WalletsAddMultisigHelp from './screen/wallets/addMultisigHelp';
import PleaseBackup from './screen/wallets/pleaseBackup';
import PleaseBackupQrcode from './screen/wallets/pleaseBackupQrcode';
import ImportWallet from './screen/wallets/import';
import WalletDetails from './screen/wallets/details';
import WalletExport from './screen/wallets/export';
import ExportMultisigCoordinationSetup from './screen/wallets/exportMultisigCoordinationSetup';
import ViewEditMultisigCosigners from './screen/wallets/viewEditMultisigCosigners';
import WalletXpub from './screen/wallets/xpub';
import SignVerify from './screen/wallets/signVerify';
import WalletAddresses from './screen/wallets/addresses';
import BuyBitcoin from './screen/wallets/buyBitcoin';
import HodlHodl from './screen/wallets/hodlHodl';
import HodlHodlViewOffer from './screen/wallets/hodlHodlViewOffer';
import HodlHodlLogin from './screen/wallets/hodlHodlLogin';
import HodlHodlWebview from './screen/wallets/hodlHodlWebview';
import HodlHodlMyContracts from './screen/wallets/hodlHodlMyContracts';
import Marketplace from './screen/wallets/marketplace';
import ReorderWallets from './screen/wallets/reorderWallets';
import SelectWallet from './screen/wallets/selectWallet';
import ProvideEntropy from './screen/wallets/provideEntropy';
import AOPP from './screen/wallets/aopp';

import TransactionDetails from './screen/transactions/details';
import TransactionStatus from './screen/transactions/transactionStatus';
import CPFP from './screen/transactions/CPFP';
import RBFBumpFee from './screen/transactions/RBFBumpFee';
import RBFCancel from './screen/transactions/RBFCancel';


import UnlockWith from './UnlockWith';
import DrawerList from './screen/wallets/drawerList';
import { isDesktop, isTablet } from './blue_modules/environment';
import SettingsPrivacy from './screen/settings/SettingsPrivacy';
import LNDViewAdditionalInvoicePreImage from './screen/lnd/lndViewAdditionalInvoicePreImage';

import MainTabs from './screen/MainTabs'


const defaultScreenOptions =
  Platform.OS === 'ios'
    ? ({ route, navigation }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight: navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 10 : undefined,
        ...TransitionPresets.ModalPresentationIOS,
        gestureResponseDistance: { vertical: Dimensions.get('window').height, horizontal: 50 },
      })
    : {
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ScaleFromCenterAndroid,
      };
const defaultStackScreenOptions =
  Platform.OS === 'ios'
    ? {
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight: 10,
      }
    : {
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ScaleFromCenterAndroid,
      };



const UnlockWithScreenStack = createStackNavigator();
const UnlockWithScreenRoot = () => (
  <UnlockWithScreenStack.Navigator name="UnlockWithScreenRoot" screenOptions={{ headerShown: false }}>
    <UnlockWithScreenStack.Screen name="UnlockWithScreen" component={UnlockWith} initialParams={{ unlockOnComponentMount: true }} />
  </UnlockWithScreenStack.Navigator>
);



const InitStack = createStackNavigator();
const InitRoot = () => (
  <InitStack.Navigator screenOptions={defaultScreenOptions} initialRouteName="UnlockWithScreenRoot">
    <InitStack.Screen name="UnlockWithScreenRoot" component={UnlockWithScreenRoot} options={{ headerShown: false, animationEnabled: false }}/>
    <InitStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false, animationEnabled: false }}/>
    <InitStack.Screen name="SettingTabs" component={Settings} options={{ headerShown: false, gestureEnabled: false }}  />
  </InitStack.Navigator>
);

export default InitRoot;
