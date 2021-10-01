import React, { createContext, ReactNode, useContext, useEffect } from "react";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setStorageLoading] = useState(true);
  const keyStorage = "@gofinances:user"

  useEffect(() => {
    const loads = async () => {
     
     const userResponse =  await AsyncStorage.getItem(
        keyStorage
      );
      if(userResponse){
        setUser(JSON.parse(userResponse))
      }
      setStorageLoading(true)
    }

    loads()
  } ,[])

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "985852499682-6cn78epdargopa2m700jfqcvv6jb6ev7.apps.googleusercontent.com",
        androidClientId:
          "985852499682-1rl536sf1of16ona1tg7c15vtpl0ugji.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
     
      if (result.type === "success") {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };
        console.log(userLogged);
        setUser(userLogged)
        await AsyncStorage.setItem(
          keyStorage,
          JSON.stringify(userLogged)
        );

      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ]
      });

      if (credential) {

        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };
        console.log(userLogged);
        setUser(userLogged)
        await AsyncStorage.setItem(
          keyStorage,
          JSON.stringify(userLogged)
        );

      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut(){
    setUser({} as User);
    await AsyncStorage.removeItem(keyStorage)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
