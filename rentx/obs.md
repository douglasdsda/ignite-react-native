# Yarn

- yarn add styled-components
- yarn add react-native-responsive-fontsize
- yarn add react-native-iphone-x-helper
- yarn add react-native-calendars
- yarn add @react-navigation/native
- yarn add @react-navigation/stack
- yarn add axios
- yarn add date-fns
- yarn add yup
- yarn add @react-navigation/bottom-tabs

# Dev
- yarn add @types/styled-components-react-native -D
- yarn add  @types/react-native-calendars -D

# Expo

- expo install expo-font @expo-google-fonts/inter @expo-google-fonts/archivo

- expo install expo-app-loading
 
 - expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

- expo install react-native-reanimated

-expo install lottie-react-native
---
# Global

- npm install -g json-server
executar : json-server ./src/services/server.json --host 192.168.100.9 --port 3333 --delay 700

yarn json-server server.json --host 192.168.100.2 --port 3333 --delay 700
--

# Outros

* SVG

  - expo install react-native-svg
  - yarn add --dev react-native-svg-transformer

```
// tem configurar metro.config

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
```
