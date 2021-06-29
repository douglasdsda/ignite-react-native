# Yarn

- yarn add styled-components
- yarn add react-native-responsive-fontsize
- yarn add react-native-iphone-x-helper
- yarn add react-native-calendars


# Dev
- yarn add @types/styled-components-react-native -D
- yarn add  @types/react-native-calendars -D

# Expo

- expo install expo-font @expo-google-fonts/inter @expo-google-fonts/archivo

- expo install expo-app-loading
 


---

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
