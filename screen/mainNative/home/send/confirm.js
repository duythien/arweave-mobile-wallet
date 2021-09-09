/* global alert */
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import { PayjoinClient } from 'payjoin-client';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import PropTypes from 'prop-types';

import PayjoinTransaction from '../../class/payjoin-transaction';
import { BlueButton, BlueText, SafeBlueArea, BlueCard } from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import { BitcoinUnit } from '../../models/bitcoinUnits';
import Biometric from '../../class/biometrics';
import loc, {formatBalanceWithoutSuffix } from '../../loc';
import {formatBalance, formatAmountFiat} from '../../helpers/arweare'
import Notifications from '../../blue_modules/notifications';
import { BlueStorageContext } from '../../blue_modules/storage-context';
import { Psbt } from 'bitcoinjs-lib';
import { isTorCapable } from '../../blue_modules/environment';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
const currency = require('../../blue_modules/currency');
const BlueElectrum = require('../../blue_modules/BlueElectrum');
const Bignumber = require('bignumber.js');
const bitcoin = require('bitcoinjs-lib');
const torrific = require('../../blue_modules/torrific');

const SendConfirm = () => {
  const { wallets, fetchAndSaveWalletTransactions } = useContext(BlueStorageContext);
  const [isBiometricUseCapableAndEnabled, setIsBiometricUseCapableAndEnabled] = useState(false);
  const { params } = useRoute();
  const { recipients = [], walletID, fee, memo, tx} = params;
  const [isLoading, setIsLoading] = useState(false);
  const wallet = wallets.find(wallet => wallet.getID() === walletID);
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const stylesHook = StyleSheet.create({
    transactionDetailsTitle: {
      color: colors.foregroundColor,
    },
    transactionDetailsSubtitle: {
      color: colors.feeText,
    },
    transactionAmountFiat: {
      color: colors.feeText,
    },

    valueValue: {
      color: colors.alternativeTextColor2,
    },
    valueUnit: {
      color: colors.alternativeTextColor2,
    },
    root: {
      backgroundColor: colors.elevated,
    },

    txText: {
      color: colors.feeText,
    },
    payjoinWrapper: {
      backgroundColor: colors.buttonDisabledBackgroundColor,
    },
  });

  useEffect(() => {
    console.log('params', params)
    console.log('send/confirm - useEffect');
    console.log('address = ', recipients);
    Biometric.isBiometricUseCapableAndEnabled().then(setIsBiometricUseCapableAndEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const send = async () => {
    setIsLoading(true);
    try {
      
      //amount = formatBalanceWithoutSuffix(amount, BitcoinUnit.BTC, false);
      amount = params.amount;
      navigate('SendSuccess', {
        fee: Number(fee),
        amount,
      });

      setIsLoading(false);

      await new Promise(resolve => setTimeout(resolve, 3000)); // sleep to make sure network propagates
      fetchAndSaveWalletTransactions(walletID);
    } catch (error) {
      ReactNativeHapticFeedback.trigger('notificationError', {
        ignoreAndroidSystemSettings: false,
      });
      setIsLoading(false);
      alert(error.message);
    }
  };


  const _renderItem = ({ index, item }) => {
    console.log('item', item)
    return (
      <>
        <View style={styles.valueWrap}>
          <Text testID="TransactionValue" style={[styles.valueValue, stylesHook.valueValue]}>
            { item.amount }
          </Text>
          <Text style={[styles.valueUnit, stylesHook.valueUnit]}>{' ' + loc.units[BitcoinUnit.BTC]}</Text>
        </View>
        <Text style={[styles.transactionAmountFiat, stylesHook.transactionAmountFiat]}>{formatAmountFiat(item.amount)}</Text>
        <BlueCard>
          <Text style={[styles.transactionDetailsTitle, stylesHook.transactionDetailsTitle]}>{loc.send.create_to}</Text>
          <Text testID="TransactionAddress" style={[styles.transactionDetailsSubtitle, stylesHook.transactionDetailsSubtitle]}>
            {item.address}
          </Text>
        </BlueCard>
        {recipients.length > 1 && (
          <BlueText style={styles.valueOf}>{loc.formatString(loc._.of, { number: index + 1, total: recipients.length })}</BlueText>
        )}
      </>
    );
  };
  _renderItem.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeBlueArea style={[styles.root, stylesHook.root]}>
      <View style={styles.cardTop}>
        <FlatList
          scrollEnabled={recipients.length > 1}
          extraData={recipients}
          data={recipients}
          renderItem={_renderItem}
          keyExtractor={(_item, index) => `${index}`}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <View style={styles.cardBottom}>
        <BlueCard>
          <Text style={styles.cardText} testID="TransactionFee">
            {loc.send.create_fee}: { formatBalance(fee) }
          </Text>
          {isLoading ? <ActivityIndicator /> : <BlueButton onPress={send} title={loc.send.confirm_sendNow} />}
          <TouchableOpacity
            accessibilityRole="button"
            testID="TransactionDetailsButton"
            style={styles.txDetails}
            onPress={async () => {
              if (isBiometricUseCapableAndEnabled) {
                if (!(await Biometric.unlockWithBiometrics())) {
                  return;
                }
              }

              navigate('SendDetails', {
                fee,
                recipients,
                memo,
                tx,
                wallet
              });
            }}
          >
            <Text style={[styles.txText, stylesHook.txText]}>{loc.transactions.details_transaction_details}</Text>
          </TouchableOpacity>
        </BlueCard>
      </View>
    </SafeBlueArea>
  );
};

export default SendConfirm;

const styles = StyleSheet.create({
  transactionDetailsTitle: {
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 2,
  },
  transactionDetailsSubtitle: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 20,
  },
  transactionAmountFiat: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 8,
    textAlign: 'center',
  },
  valueWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  valueValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  valueUnit: {
    fontSize: 16,
    marginHorizontal: 4,
    paddingBottom: 6,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  valueOf: {
    alignSelf: 'flex-end',
    marginRight: 18,
    marginVertical: 8,
  },
  separator: {
    height: 0.5,
    margin: 16,
  },
  root: {
    paddingTop: 19,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexGrow: 8,
    marginTop: 16,
    alignItems: 'center',
    maxHeight: '70%',
  },
  cardBottom: {
    flexGrow: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    width: '100%',
  },
  cardText: {
    flexDirection: 'row',
    color: '#37c0a1',
    fontSize: 14,
    marginVertical: 8,
    marginHorizontal: 24,
    paddingBottom: 6,
    fontWeight: '500',
    alignSelf: 'center',
  },
  txDetails: {
    marginTop: 16,
  },
  txText: {
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
  },
  payjoinWrapper: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payjoinText: {
    color: '#81868e',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

SendConfirm.navigationOptions = navigationStyle({}, opts => ({ ...opts, title: loc.send.confirm_header }));
