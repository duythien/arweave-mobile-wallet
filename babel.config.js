module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: false
      }
    ],
    'react-native-reanimated/plugin'
  ], // required by react-native-reanimated v2 https://docs.swmansion.com/react-native-reanimated/docs/installation/
};
