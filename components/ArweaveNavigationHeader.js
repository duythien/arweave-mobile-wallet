/* eslint react/prop-types: "off", react-native/no-inline-styles: "off" */
import React, { Component, useState, useMemo, useCallback, useContext, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Text, Header, ListItem, Avatar } from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  PixelRatio,
  Platform,
  PlatformColor,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  InteractionManager,
  I18nManager,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import { LightningCustodianWallet, MultisigHDWallet } from '../class';
import { BitcoinUnit } from '../models/bitcoinUnits';
import WalletGradient from '../class/wallet-gradient';
import { BlurView } from '@react-native-community/blur';
import Biometric from '../class/biometrics';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import loc, { formatBalance, formatStringAddTwoWhiteSpaces, formatBalanceWithoutSuffix, transactionTimeToReadable } from '../loc';
import { BlueStorageContext } from '../blue_modules/storage-context';
import ToolTipMenu from './TooltipMenu';

export class ArweaveNavigationHeader extends Component {
  static propTypes = {
    wallet: PropTypes.shape().isRequired,
    onWalletUnitChange: PropTypes.func,
  };

  static getDerivedStateFromProps(props) {
    return { wallet: props.wallet, onWalletUnitChange: props.onWalletUnitChange };
  }

  static contextType = BlueStorageContext;
  walletBalanceText = React.createRef();
  tooltip = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      wallet: props.wallet,
      walletPreviousPreferredUnit: props.wallet.getPreferredBalanceUnit(),
      allowOnchainAddress: false,
      balance: 0
    };
  }

  handleCopyPress = _item => {
    Clipboard.setString(formatBalance(this.state.wallet.getBalance(), this.state.wallet.getPreferredBalanceUnit()).toString());
  };

  componentDidUpdate(prevState) {

    InteractionManager.runAfterInteractions(() => {
      if (prevState.wallet.getID() !== this.state.wallet.getID() && this.state.wallet.type === LightningCustodianWallet.type) {
        this.verifyIfWalletAllowsOnchainAddress();
      }
    });
  }

  verifyIfWalletAllowsOnchainAddress = () => {
    if (this.state.wallet.type === LightningCustodianWallet.type) {
      this.state.wallet
        .allowOnchainAddress()
        .then(value => this.setState({ allowOnchainAddress: value }))
        .catch(e => {
          console.log('This Lndhub wallet does not have an onchain address API.');
          this.setState({ allowOnchainAddress: false });
        });
    }
  };

  componentDidMount() {
    this.verifyIfWalletAllowsOnchainAddress();
  }

  handleBalanceVisibility = async _item => {
    const wallet = this.state.wallet;

    const isBiometricsEnabled = await Biometric.isBiometricUseCapableAndEnabled();

    if (isBiometricsEnabled && wallet.hideBalance) {
      if (!(await Biometric.unlockWithBiometrics())) {
        return this.props.navigation.goBack();
      }
    }

    wallet.hideBalance = !wallet.hideBalance;
    this.setState({ wallet });
    await this.context.saveToDisk();
  };

  changeWalletBalanceUnit = () => {
    let walletPreviousPreferredUnit = this.state.wallet.getPreferredBalanceUnit();
    const wallet = this.state.wallet;
    if (walletPreviousPreferredUnit === BitcoinUnit.BTC) {
      wallet.preferredBalanceUnit = BitcoinUnit.SATS;
      walletPreviousPreferredUnit = BitcoinUnit.BTC;
    } else if (walletPreviousPreferredUnit === BitcoinUnit.SATS) {
      wallet.preferredBalanceUnit = BitcoinUnit.LOCAL_CURRENCY;
      walletPreviousPreferredUnit = BitcoinUnit.SATS;
    } else if (walletPreviousPreferredUnit === BitcoinUnit.LOCAL_CURRENCY) {
      wallet.preferredBalanceUnit = BitcoinUnit.BTC;
      walletPreviousPreferredUnit = BitcoinUnit.BTC;
    } else {
      wallet.preferredBalanceUnit = BitcoinUnit.BTC;
      walletPreviousPreferredUnit = BitcoinUnit.BTC;
    }

    this.setState({ wallet, walletPreviousPreferredUnit: walletPreviousPreferredUnit }, () => {
      this.props.onWalletUnitChange(wallet);
    });
  };

  manageFundsPressed = () => {
    this.props.onManageFundsPressed();
  };

  showToolTipMenu = () => {
    this.tooltip.current.showMenu();
  };

  render() {
    return (
      <LinearGradient
        colors={WalletGradient.gradientsFor(this.state.wallet.type)}
        style={{ padding: 15, minHeight: 140, justifyContent: 'center' }}
        {...WalletGradient.linearGradientProps(this.state.wallet.type)}
      >
        <Image
          source={(() => {
            switch (this.state.wallet.type) {
              case LightningCustodianWallet.type:
                return 
              default:
                return I18nManager.isRTL ? require('../../img/btc-shape-rtl.png') : require('../../img/btc-shape.png');
            }
          })()}
          style={{
            width: 99,
            height: 94,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
        <Text
          testID="WalletLabel"
          numberOfLines={1}
          style={{
            backgroundColor: 'transparent',
            fontSize: 19,
            color: '#fff',
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          }}
        >
          {this.state.wallet.getLabel()}
        </Text>
        <ToolTipMenu
          ref={this.tooltip}
          anchorRef={this.walletBalanceText}
          actions={
            this.state.wallet.hideBalance
              ? [
                  {
                    id: 'walletBalanceVisibility',
                    text: loc.transactions.details_balance_show,
                    onPress: this.handleBalanceVisibility,
                  },
                ]
              : [
                  {
                    id: 'walletBalanceVisibility',
                    text: loc.transactions.details_balance_hide,
                    onPress: this.handleBalanceVisibility,
                  },
                  {
                    id: 'copyToClipboard',
                    text: loc.transactions.details_copy,
                    onPress: this.handleCopyPress,
                  },
                ]
          }
        />
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.balance}
          onPress={this.changeWalletBalanceUnit}
          ref={this.walletBalanceText}
          onLongPress={this.showToolTipMenu}
        >
          {this.state.wallet.hideBalance ? (
            <BluePrivateBalance />
          ) : (
            <Text
              testID="WalletBalance"
              key={this.props.wallet.balanceHuman} // force component recreation on balance change. To fix right-to-left languages, like Farsi
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                fontSize: 36,
                color: '#fff',
                writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
              }}
            >
              {this.props.wallet.balanceHuman}
            </Text>
          )}
        </TouchableOpacity>
        {this.state.wallet.type === LightningCustodianWallet.type && this.state.allowOnchainAddress && (
          <TouchableOpacity accessibilityRole="button" onPress={this.manageFundsPressed}>
            <View
              style={{
                marginTop: 14,
                marginBottom: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 9,
                minHeight: 39,
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
                height: 39,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}
              >
                {loc.lnd.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.state.wallet.type === MultisigHDWallet.type && (
          <TouchableOpacity accessibilityRole="button" onPress={this.manageFundsPressed}>
            <View
              style={{
                marginTop: 14,
                marginBottom: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 9,
                minHeight: 39,
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
                height: 39,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}
              >
                {loc.multisig.manage_keys}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    );
  }
}