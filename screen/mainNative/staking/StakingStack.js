import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation, useTheme } from '@react-navigation/native';
import { BlueButton, BlueCard, BlueListItem, BlueSpacing20, BlueTextCentered } from '../../BlueComponents';

import { TouchableOpacity, ScrollView, Linking, Image, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import loc, { formatStringAddTwoWhiteSpaces } from '../../loc';
import { Icon } from 'react-native-elements';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {

  return (
    <View style={styles.center}>
      <Text>This is the Staking  app, and soon update :)</Text>
      <Button title="Go to About Screen" />
    </View>
  )
  
}

const Soon = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    copyToClipboard: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    copyToClipboardText: {
      fontSize: 13,
      fontWeight: '400',
      color: '#68bbe1',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 54,
    },
    logo: {
      width: 150,
      height: 150,
    },
    textFree: {
      maxWidth: 260,
      marginVertical: 24,
      color: '#9AA0AA',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },
    textBackup: {
      maxWidth: 260,
      marginBottom: 40,
      color: colors.foregroundColor,
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },
    buildWith: {
      backgroundColor: colors.inputBackgroundColor,
      padding: 16,
      paddingTop: 0,
      borderRadius: 8,
    },
    buttonLink: {
      backgroundColor: colors.lightButton,
      borderRadius: 12,
      justifyContent: 'center',
      padding: 8,
      flexDirection: 'row',
    },
    textLink: {
      color: colors.foregroundColor,
      marginLeft: 8,
      fontWeight: '600',
    },
  });

  const handleOnReleaseNotesPress = () => {
    navigate('ReleaseNotes');
  };

  const handleOnSelfTestPress = () => {
    navigate('Selftest');
  };

  const handleOnLicensingPress = () => {
    navigate('Licensing');
  };

  const handleOnTwitterPress = () => {
    Linking.openURL('https://twitter.com/bluewalletio');
  };

  const handleOnDiscordPress = () => {
    Linking.openURL('https://discord.gg/btWq2Aby2z');
  };

  const handleOnTelegramPress = () => {
    Linking.openURL('https://t.me/bluewallethat');
  };
  const handleOnGithubPress = () => {
    Linking.openURL('https://github.com/BlueWallet/BlueWallet');
  };
  const handleOnRatePress = () => {
    const options = {
      AppleAppID: '1376878040',
      GooglePackageName: 'io.bluewallet.bluewallet',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://bluewallet.io',
    };
    Rate.rate(options, success => {
      if (success) {
        console.log('User Rated.');
      }
    });
  };

  return (
    <ScrollView testID="AboutScrollView" contentInsetAdjustmentBehavior="automatic">
      <BlueCard>
        <View style={styles.center}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <Text style={styles.textFree}>{loc.settings.about_free}</Text>
          <Text style={styles.textBackup}>Staking soon update:)</Text>
          <BlueButton onPress={handleOnRatePress} title={loc.settings.about_review + ' ⭐🙏'} />
        </View>
      </BlueCard>
      <BlueListItem
        leftIcon={{
          name: 'twitter',
          type: 'font-awesome',
          color: '#1da1f2',
        }}
        onPress={handleOnTwitterPress}
        title={loc.settings.about_sm_twitter}
      />
      <BlueListItem
        leftIcon={{
          name: 'telegram',
          type: 'font-awesome',
          color: '#0088cc',
        }}
        onPress={handleOnTelegramPress}
        title={loc.settings.about_sm_telegram}
      />
      <BlueListItem
        leftIcon={{
          name: 'discord',
          type: 'font-awesome-5',
          color: '#7289da',
        }}
        onPress={handleOnDiscordPress}
        title={loc.settings.about_sm_discord}
      />
      <BlueCard>
        <View style={styles.buildWith}>
          <BlueSpacing20 />

          <BlueTextCentered>{loc.settings.about_awesome} 👍</BlueTextCentered>
          <BlueSpacing20 />
          <BlueTextCentered>React Native</BlueTextCentered>
          <BlueTextCentered>bitcoinjs-lib</BlueTextCentered>
          <BlueTextCentered>Nodejs</BlueTextCentered>
          <BlueTextCentered>Electrum server</BlueTextCentered>
          <BlueSpacing20 />

          <TouchableOpacity accessibilityRole="button" onPress={handleOnGithubPress} style={styles.buttonLink}>
            <Icon size={22} name="github" type="font-awesome-5" color={colors.foregroundColor} />
            <Text style={styles.textLink}>{formatStringAddTwoWhiteSpaces(loc.settings.about_sm_github)}</Text>
          </TouchableOpacity>
        </View>
      </BlueCard>
      <BlueListItem
        leftIcon={{
          name: 'book',
          type: 'font-awesome',
          color: '#9AA0AA',
        }}
        chevron
        onPress={handleOnReleaseNotesPress}
        title={loc.settings.about_release_notes}
      />
      <BlueListItem
        leftIcon={{
          name: 'law',
          type: 'octicon',
          color: colors.foregroundColor,
        }}
        chevron
        onPress={handleOnLicensingPress}
        title={loc.settings.about_license}
      />
      <BlueListItem
        leftIcon={{
          name: 'flask',
          type: 'font-awesome',
          color: '#FC0D44',
        }}
        chevron
        onPress={handleOnSelfTestPress}
        testID="RunSelfTestButton"
        title={loc.settings.about_selftest}
      />
      <BlueSpacing20 />
      <BlueSpacing20 />
      
      <BlueSpacing20 />
    </ScrollView>
  );
};



const Stack = createStackNavigator()

export default function StackingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Soon" component={Soon} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
