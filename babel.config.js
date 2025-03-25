// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: ['react-native-reanimated/plugin']
// };


// babel.config.js
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     // Other plugins...
//     'react-native-reanimated/plugin', // Ensure this is the last entry
//   ],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    'react-native-reanimated/plugin' // Always keep this as the last plugin
  ],
};