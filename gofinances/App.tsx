import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
 

import AppLoading from "expo-app-loading";
import { AuthProvider, useAuth } from './src/hooks/auth'
import { Routes } from "./src/routes";

import theme from "./src/global/styles/theme";
import { ThemeProvider } from "styled-components/native";
 

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
 

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const { userStorageLoading } = useAuth()

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      
        <AuthProvider>
           <Routes />

        </AuthProvider>
     
    </ThemeProvider>
  );
}
