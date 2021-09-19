import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  I18nManager,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import RNFS from 'react-native-fs';
import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';

import { BlueButton, BlueDismissKeyboardInputAccessory, BlueListItem, BlueLoading } from '../../BlueComponents';
import { navigationStyleTx } from '../../components/navigationStyle';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../models/networkTransactionFees';
import { BitcoinUnit, Chain } from '../../models/bitcoinUnits';
import { HDSegwitBech32Wallet, MultisigHDWallet, WatchOnlyWallet } from '../../class';
import DocumentPicker from 'react-native-document-picker';
import DeeplinkSchemaMatch from '../../class/deeplink-schema-match';
import loc, { formatBalance, formatBalanceWithoutSuffix } from '../../loc';
import CoinsSelected from '../../components/CoinsSelected';
import BottomModal from '../../components/BottomModal';
import AddressInput from '../../components/AddressInput';
import AmountInput from '../../components/AmountInput';
import InputAccessoryAllFunds from '../../components/InputAccessoryAllFunds';
import { BlueStorageContext } from '../../blue_modules/storage-context';
const currency = require('../../blue_modules/currency');
const prompt = require('../../blue_modules/prompt');
const fs = require('../../blue_modules/fs');
const scanqr = require('../../helpers/scan-qr');
const btcAddressRx = /^[a-zA-Z0-9]{26,35}$/;

const SendDetails = () => {
  const { wallets, setSelectedWallet, sleep, txMetadata, saveToDisk } = useContext(BlueStorageContext);
  const navigation = useNavigation();
  const { name, params: routeParams } = useRoute();
  const scrollView = useRef();
  const scrollIndex = useRef(0);
  const { colors } = useTheme();

  // state
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [walletSelectionOrCoinsSelectedHidden, setWalletSelectionOrCoinsSelectedHidden] = useState(false);
  const [isAmountToolbarVisibleForAndroid, setIsAmountToolbarVisibleForAndroid] = useState(false);
  const [isFeeSelectionModalVisible, setIsFeeSelectionModalVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isTransactionReplaceable, setIsTransactionReplaceable] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [units, setUnits] = useState([]);
  const [memo, setMemo] = useState('');
  const [networkTransactionFees, setNetworkTransactionFees] = useState(new NetworkTransactionFee(3, 2, 1));
  const [networkTransactionFeesIsLoading, setNetworkTransactionFeesIsLoading] = useState(false);
  const [customFee, setCustomFee] = useState(null);
  const [feePrecalc, setFeePrecalc] = useState({ current: null, slowFee: null, mediumFee: null, fastestFee: null });
  const [feeUnit, setFeeUnit] = useState();
  const [amountUnit, setAmountUnit] = useState();
  const [utxo, setUtxo] = useState(null);
  const [payjoinUrl, setPayjoinUrl] = useState(null);
  const [changeAddress, setChangeAddress] = useState();
  const [dumb, setDumb] = useState(false);
  const [balance, setBalance] = useState('');

  const [amount, setAmount] = useState('0');


  // if cutomFee is not set, we need to choose highest possible fee for wallet balance
  // if there are no funds for even Slow option, use 1 sat/byte fee
  //@TODO
  const feeRate = useMemo(() => {
    return '0.000001494576'
  }, []);

  // keyboad effects
  useEffect(() => {
    const _keyboardDidShow = () => {
      setWalletSelectionOrCoinsSelectedHidden(true);
      setIsAmountToolbarVisibleForAndroid(true);
    };

    const _keyboardDidHide = () => {
      setWalletSelectionOrCoinsSelectedHidden(false);
      setIsAmountToolbarVisibleForAndroid(false);
    };

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const wallet = (routeParams.walletID && wallets.find(w => w.getID() === routeParams.walletID));
    setWallet(wallet);
    setAddresses([{ address: '', key: String(Math.random()) }]); // key is for the FlatList
    // we are ready!
    setIsLoading(false);    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mountedRef = useRef(true)
  useEffect(() => {
    // CALL YOUR API OR ASYNC FUNCTION HERE
    (async () => {
      if (wallet) {
        try {
          const result = await wallet.getBalance();
          if (result) {
            setBalance(result)
          }
          console.log(balance)

        } catch (e) {
          console.log(e)
        }
      }
    });

    return () => { mountedRef.current = false }
  }, [])
  

  const processAddressData = () => {
  }

  const createTransaction = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    //alert('createTransaction');
    let recipients = addresses;
    navigation.navigate('SendConfirm', {
      fee:feeRate,
      memo,
      amount,
      recipients,
      walletID: wallet.getID()
    });
    setIsLoading(false);
    
  };

  

  const onWalletSelect = wallet => {
    setWallet(wallet);
    navigation.pop();
  };

  /**
   * same as `importTransaction`, but opens camera instead.
   *
   * @returns {Promise<void>}
   */
  const importQrTransaction = () => {
    if (wallet.type !== WatchOnlyWallet.type) {
      return Alert.alert(loc.errors.error, 'Error: importing transaction in non-watchonly wallet (this should never happen)');
    }

    setOptionsVisible(false);

    navigation.navigate('ScanQRCodeRoot', {
      screen: 'ScanQRCode',
      params: {
        onBarScanned: importQrTransactionOnBarScanned,
        showFileImportButton: false,
      },
    });
  };

  const importQrTransactionOnBarScanned = ret => {
    navigation.dangerouslyGetParent().pop();
    if (!ret.data) ret = { data: ret };
    if (ret.data.toUpperCase().startsWith('UR')) {
      Alert.alert(loc.errors.error, 'BC-UR not decoded. This should never happen');
    } else if (ret.data.indexOf('+') === -1 && ret.data.indexOf('=') === -1 && ret.data.indexOf('=') === -1) {
      // this looks like NOT base64, so maybe its transaction's hex
      // we dont support it in this flow
    } else {
      // psbt base64?

      // we construct PSBT object and pass to next screen
      // so user can do smth with it:
      const psbt = bitcoin.Psbt.fromBase64(ret.data);
      navigation.navigate('PsbtWithHardwareWallet', {
        memo,
        fromWallet: wallet,
        psbt,
      });
      setIsLoading(false);
      setOptionsVisible(false);
    }
  };

  /**
   * watch-only wallets with enabled HW wallet support have different flow. we have to show PSBT to user as QR code
   * so he can scan it and sign it. then we have to scan it back from user (via camera and QR code), and ask
   * user whether he wants to broadcast it.
   * alternatively, user can export psbt file, sign it externally and then import it
   *
   * @returns {Promise<void>}
   */
  const importTransaction = async () => {
    if (wallet.type !== WatchOnlyWallet.type) {
      return Alert.alert(loc.errors.error, 'Importing transaction in non-watchonly wallet (this should never happen)');
    }

    try {
      const res = await DocumentPicker.pick({
        type:
          Platform.OS === 'ios'
            ? ['io.bluewallet.psbt', 'io.bluewallet.psbt.txn', DocumentPicker.types.plainText, 'public.json']
            : [DocumentPicker.types.allFiles],
      });

      if (DeeplinkSchemaMatch.isPossiblySignedPSBTFile(res.uri)) {
        // we assume that transaction is already signed, so all we have to do is get txhex and pass it to next screen
        // so user can broadcast:
        const file = await RNFS.readFile(res.uri, 'ascii');
        const psbt = bitcoin.Psbt.fromBase64(file);
        const txhex = psbt.extractTransaction().toHex();
        navigation.navigate('PsbtWithHardwareWallet', { memo, fromWallet: wallet, txhex });
        setIsLoading(false);
        setOptionsVisible(false);
        return;
      }

      if (DeeplinkSchemaMatch.isPossiblyPSBTFile(res.uri)) {
        // looks like transaction is UNsigned, so we construct PSBT object and pass to next screen
        // so user can do smth with it:
        const file = await RNFS.readFile(res.uri, 'ascii');
        const psbt = bitcoin.Psbt.fromBase64(file);
        navigation.navigate('PsbtWithHardwareWallet', { memo, fromWallet: wallet, psbt });
        setIsLoading(false);
        setOptionsVisible(false);
        return;
      }

      if (DeeplinkSchemaMatch.isTXNFile(res.uri)) {
        // plain text file with txhex ready to broadcast
        const file = (await RNFS.readFile(res.uri, 'ascii')).replace('\n', '').replace('\r', '');
        navigation.navigate('PsbtWithHardwareWallet', { memo, fromWallet: wallet, txhex: file });
        setIsLoading(false);
        setOptionsVisible(false);
        return;
      }

      Alert.alert(loc.errors.error, loc.send.details_unrecognized_file_format);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert(loc.errors.error, loc.send.details_no_signed_tx);
      }
    }
  };

  const askCosignThisTransaction = async () => {
    return new Promise(resolve => {
      Alert.alert(
        '',
        loc.multisig.cosign_this_transaction,
        [
          {
            text: loc._.no,
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: loc._.yes,
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false },
      );
    });
  };

  const _importTransactionMultisig = async base64arg => {
    try {
      const base64 = base64arg || (await fs.openSignedTransaction());
      if (!base64) return;
      const psbt = bitcoin.Psbt.fromBase64(base64); // if it doesnt throw - all good, its valid

      if (wallet.howManySignaturesCanWeMake() > 0 && (await askCosignThisTransaction())) {
        hideOptions();
        setIsLoading(true);
        await sleep(100);
        wallet.cosignPsbt(psbt);
        setIsLoading(false);
        await sleep(100);
      }

      navigation.navigate('PsbtMultisig', {
        memo,
        psbtBase64: psbt.toBase64(),
        walletID: wallet.getID(),
      });
    } catch (error) {
      Alert.alert(loc.send.problem_with_psbt, error.message);
    }
    setIsLoading(false);
    setOptionsVisible(false);
  };

  const importTransactionMultisig = () => {
    return _importTransactionMultisig();
  };

  const onBarScanned = ret => {
    navigation.dangerouslyGetParent().pop();
    if (!ret.data) ret = { data: ret };
    if (ret.data.toUpperCase().startsWith('UR')) {
      Alert.alert(loc.errors.error, 'BC-UR not decoded. This should never happen');
    } else if (ret.data.indexOf('+') === -1 && ret.data.indexOf('=') === -1 && ret.data.indexOf('=') === -1) {
      // this looks like NOT base64, so maybe its transaction's hex
      // we dont support it in this flow
    } else {
      // psbt base64?
      return _importTransactionMultisig(ret.data);
    }
  };

  const importTransactionMultisigScanQr = () => {
    setOptionsVisible(false);
    navigation.navigate('ScanQRCodeRoot', {
      screen: 'ScanQRCode',
      params: {
        onBarScanned,
        showFileImportButton: true,
      },
    });
  };

  const handleAddRecipient = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => scrollView.current.scrollToEnd());
    setAddresses(addresses => [...addresses, { address: '', key: String(Math.random()) }]);
    setOptionsVisible(false);
    scrollView.current.scrollToEnd();
    if (addresses.length === 0) return;
    await sleep(200); // wait for animation
    scrollView.current.flashScrollIndicators();
  };

  const handleRemoveRecipient = async () => {
    const last = scrollIndex.current === addresses.length - 1;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddresses(addresses => {
      addresses.splice(scrollIndex.current, 1);
      return [...addresses];
    });
    setOptionsVisible(false);
    if (addresses.length === 0) return;
    await sleep(200); // wait for animation
    scrollView.current.flashScrollIndicators();
    if (last && Platform.OS === 'android') scrollView.current.scrollToEnd(); // fix white screen on android
  };

  const handleCoinControl = () => {
    setOptionsVisible(false);
    navigation.navigate('CoinControl', {
      walletID: wallet.getID(),
      onUTXOChoose: utxo => setUtxo(utxo),
    });
  };

  const handlePsbtSign = async () => {
    
  };

  const hideOptions = () => {
    Keyboard.dismiss();
    setOptionsVisible(false);
  };

  const onReplaceableFeeSwitchValueChanged = value => {
    setIsTransactionReplaceable(value);
  };

  // because of https://github.com/facebook/react-native/issues/21718 we use
  // onScroll for android and onMomentumScrollEnd for iOS
  const handleRecipientsScrollEnds = e => {
    if (Platform.OS === 'android') return; // for android we use handleRecipientsScroll
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const index = Math.floor(contentOffset.x / viewSize.width);
    scrollIndex.current = index;
  };

  const handleRecipientsScroll = e => {
    if (Platform.OS === 'ios') return; // for iOS we use handleRecipientsScrollEnds
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const index = Math.floor(contentOffset.x / viewSize.width);
    scrollIndex.current = index;
  };

  const onUseAllPressed = () => {
    ReactNativeHapticFeedback.trigger('notificationWarning');
    Alert.alert(
      loc.send.details_adv_full,
      loc.send.details_adv_full_sure,
      [
        {
          text: loc._.ok,
          onPress: () => {
            Keyboard.dismiss();
            setAddresses(addresses => {
              addresses[scrollIndex.current].amount = BitcoinUnit.MAX;
              addresses[scrollIndex.current].amountSats = BitcoinUnit.MAX;
              return [...addresses];
            });
            setUnits(units => {
              units[scrollIndex.current] = BitcoinUnit.BTC;
              return [...units];
            });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOptionsVisible(false);
          },
          style: 'default',
        },
        { text: loc._.cancel, onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: false },
    );
  };

  const formatFee = fee => formatBalance(fee, feeUnit, true);

  const stylesHook = StyleSheet.create({
    loading: {
      backgroundColor: colors.background,
    },
    root: {
      backgroundColor: colors.elevated,
    },
    modalContent: {
      backgroundColor: colors.modal,
      borderTopColor: colors.borderTopColor,
      borderWidth: colors.borderWidth,
    },
    optionsContent: {
      backgroundColor: colors.modal,
      borderTopColor: colors.borderTopColor,
      borderWidth: colors.borderWidth,
    },
    feeModalItemActive: {
      backgroundColor: colors.feeActive,
    },
    feeModalLabel: {
      color: colors.successColor,
    },
    feeModalTime: {
      backgroundColor: colors.successColor,
    },
    feeModalTimeText: {
      color: colors.background,
    },
    feeModalValue: {
      color: colors.successColor,
    },
    feeModalCustomText: {
      color: colors.buttonAlternativeTextColor,
    },
    selectLabel: {
      color: colors.buttonTextColor,
    },
    of: {
      color: colors.feeText,
    },
    memo: {
      borderColor: colors.formBorder,
      borderBottomColor: colors.formBorder,
      backgroundColor: colors.inputBackgroundColor,
    },
    feeLabel: {
      color: colors.feeText,
    },
    feeRow: {
      backgroundColor: colors.feeLabel,
    },
    feeValue: {
      color: colors.feeValue,
    },
  });

  const renderFeeSelectionModal = () => {
    const nf = networkTransactionFees;
    const options = [
      {
        label: loc.send.fee_fast,
        time: loc.send.fee_10m,
        fee: feePrecalc.fastestFee,
        rate: nf.fastestFee,
        active: Number(feeRate) === nf.fastestFee,
      },
      {
        label: loc.send.fee_medium,
        time: loc.send.fee_3h,
        fee: feePrecalc.mediumFee,
        rate: nf.mediumFee,
        active: Number(feeRate) === nf.mediumFee,
      },
      {
        label: loc.send.fee_slow,
        time: loc.send.fee_1d,
        fee: feePrecalc.slowFee,
        rate: nf.slowFee,
        active: Number(feeRate) === nf.slowFee,
      },
    ];

    return (
      <BottomModal
        deviceWidth={width + width / 2}
        isVisible={isFeeSelectionModalVisible}
        onClose={() => setIsFeeSelectionModalVisible(false)}
      >
        <KeyboardAvoidingView enabled={!Platform.isPad} behavior={Platform.OS === 'ios' ? 'position' : null}>
          <View style={[styles.modalContent, stylesHook.modalContent]}>
            {options.map(({ label, time, fee, rate, active }, index) => (
              <TouchableOpacity
                accessibilityRole="button"
                key={label}
                onPress={() => {
                  setFeePrecalc(fp => ({ ...fp, current: fee }));
                  setIsFeeSelectionModalVisible(false);
                  setCustomFee(rate.toString());
                }}
                style={[styles.feeModalItem, active && styles.feeModalItemActive, active && stylesHook.feeModalItemActive]}
              >
                <View style={styles.feeModalRow}>
                  <Text style={[styles.feeModalLabel, stylesHook.feeModalLabel]}>{label}</Text>
                  <View style={[styles.feeModalTime, stylesHook.feeModalTime]}>
                    <Text style={stylesHook.feeModalTimeText}>~{time}</Text>
                  </View>
                </View>
                <View style={styles.feeModalRow}>
                  <Text style={stylesHook.feeModalValue}>{fee && formatFee(fee)}</Text>
                  <Text style={stylesHook.feeModalValue}>
                    {rate} {loc.units.sat_byte}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              testID="feeCustom"
              accessibilityRole="button"
              style={styles.feeModalCustom}
              onPress={async () => {
                let error = loc.send.fee_satbyte;
                while (true) {
                  let fee;

                  try {
                    fee = await prompt(loc.send.create_fee, error, true, 'numeric');
                  } catch (_) {
                    return;
                  }

                  if (!/^\d+$/.test(fee)) {
                    error = loc.send.details_fee_field_is_not_valid;
                    continue;
                  }

                  if (fee < 1) fee = '1';
                  fee = Number(fee).toString(); // this will remove leading zeros if any
                  setCustomFee(fee);
                  setIsFeeSelectionModalVisible(false);
                  return;
                }
              }}
            >
              <Text style={[styles.feeModalCustomText, stylesHook.feeModalCustomText]}>{loc.send.fee_custom}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </BottomModal>
    );
  };


  const renderCreateButton = () => {
    return (
      <View style={styles.createButton}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <BlueButton onPress={createTransaction} title={loc.send.details_next} testID="CreateTransactionButton" />
        )}
      </View>
    );
  };


  const renderBitcoinTransactionInfoFields = params => {
    console.log('renderBitcoinTransactionInfoFields')
    const { item, index } = params;

    return (
      <View style={{ width }} testID={'Transaction' + index}>
        <AmountInput
          isLoading={isLoading}
          amount={item.amount ? item.amount.toString() : null}
          onAmountUnitChange={unit => {
            
          }}
          onChangeText={text => {
            setAddresses(addresses => {
              item.amount = text;
              item.amountSats = parseInt(text);
              addresses[index] = item;
              return [...addresses];
            });
            setAmount(text)
          }}
          unit={units[index] || amountUnit}
          inputAccessoryViewID={InputAccessoryAllFunds.InputAccessoryViewID}
        />
        <AddressInput
          onChangeText={text => {
            text = text.trim();
            const { address, amount, memo: lmemo, payjoinUrl } = DeeplinkSchemaMatch.decodeBitcoinUri(text);
            setAddresses(addresses => {
              item.address = address || text;
              item.amount = amount || item.amount;
              addresses[index] = item;
              return [...addresses];
            });
            setMemo(lmemo || memo);
            setIsLoading(false);
            setPayjoinUrl(payjoinUrl);
          }}
          onBarScanned={processAddressData}
          address={item.address}
          isLoading={isLoading}
          inputAccessoryViewID={BlueDismissKeyboardInputAccessory.InputAccessoryViewID}
          launchedBy={name}
        />
        {addresses.length > 1 && (
          <Text style={[styles.of, stylesHook.of]}>{loc.formatString(loc._.of, { number: index + 1, total: addresses.length })}</Text>
        )}
      </View>
    );
  };

  if (isLoading || !wallet) {
    return (
      <View style={[styles.loading, stylesHook.loading]}>
        <BlueLoading />
      </View>
    );
  }

  const allBalance = balance
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.root, stylesHook.root]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        <StatusBar barStyle="light-content" />
        <View>
          <KeyboardAvoidingView enabled={!Platform.isPad} behavior="position">
            <FlatList
              keyboardShouldPersistTaps="always"
              scrollEnabled={addresses.length > 1}
              data={addresses}
              renderItem={renderBitcoinTransactionInfoFields}
              ref={scrollView}
              horizontal
              pagingEnabled
              removeClippedSubviews={false}
              onMomentumScrollBegin={Keyboard.dismiss}
              onMomentumScrollEnd={handleRecipientsScrollEnds}
              onScroll={handleRecipientsScroll}
              scrollEventThrottle={200}
              scrollIndicatorInsets={styles.scrollViewIndicator}
              contentContainerStyle={styles.scrollViewContent}
            />
            <View style={[styles.memo, stylesHook.memo]}>
              <TextInput
                onChangeText={text => setMemo(text)}
                placeholder={loc.send.details_note_placeholder}
                placeholderTextColor="#81868e"
                value={memo}
                numberOfLines={1}
                style={styles.memoText}
                editable={!isLoading}
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={BlueDismissKeyboardInputAccessory.InputAccessoryViewID}
              />
            </View>
            <TouchableOpacity
              testID="chooseFee"
              accessibilityRole="button"
              onPress={() => setIsFeeSelectionModalVisible(true)}
              disabled={isLoading}
              style={styles.fee}
            >
              <Text style={[styles.feeLabel, stylesHook.feeLabel]}>{loc.send.create_fee}</Text>

              {networkTransactionFeesIsLoading ? (
                <ActivityIndicator />
              ) : (
                <View style={[styles.feeRow, stylesHook.feeRow]}>
                  <Text style={stylesHook.feeValue}>
                    {feePrecalc.current ? formatFee(feePrecalc.current) : '1525392.0' + ' ' + loc.units.winston}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {renderCreateButton()}
            {renderFeeSelectionModal()}
          </KeyboardAvoidingView>
        </View>
        <BlueDismissKeyboardInputAccessory />
        {Platform.select({
          ios: <InputAccessoryAllFunds canUseAll={balance > 0} onUseAllPressed={onUseAllPressed} balance={allBalance} />,
          android: isAmountToolbarVisibleForAndroid && (
            <InputAccessoryAllFunds canUseAll={balance > 0} onUseAllPressed={onUseAllPressed} balance={allBalance} />
          ),
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SendDetails;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 20,
  },
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  scrollViewIndicator: {
    top: 0,
    left: 8,
    bottom: 0,
    right: 8,
  },
  modalContent: {
    padding: 22,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
  },
  optionsContent: {
    padding: 22,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 130,
  },
  feeModalItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  feeModalItemActive: {
    borderRadius: 8,
  },
  feeModalRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeModalLabel: {
    fontSize: 22,
    fontWeight: '600',
  },
  feeModalTime: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  feeModalCustom: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feeModalCustomText: {
    fontSize: 15,
    fontWeight: '600',
  },
  createButton: {
    marginVertical: 16,
    marginHorizontal: 16,
    alignContent: 'center',
    minHeight: 44,
  },
  select: {
    marginBottom: 24,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  selectTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    color: '#9aa0aa',
    fontSize: 14,
    marginRight: 8,
  },
  selectWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  selectLabel: {
    fontSize: 14,
  },
  of: {
    alignSelf: 'flex-end',
    marginRight: 18,
    marginVertical: 8,
  },
  memo: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 0.5,
    minHeight: 44,
    height: 44,
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 4,
  },
  memoText: {
    flex: 1,
    marginHorizontal: 8,
    minHeight: 33,
    color: '#81868e',
  },
  fee: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 14,
  },
  feeRow: {
    minWidth: 40,
    height: 25,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  advancedOptions: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
  },
});

