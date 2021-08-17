import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler, Alert } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
 import {useNetInfo} from '@react-native-community/netinfo'
 import {synchronize} from '@nozbe/watermelondb/sync';
 import {database} from '../../database';
 import { Car as ModelCar } from '../../database/model/Car';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CartList,
} from "./styles";
// import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
// import { CarDTO } from "../../dtos/CarDTO";

import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";
export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const netInfo = useNetInfo()
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const { user } = useAuth();

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ],
  //   };
  // });

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        

        if(isMounted){
          setCars(cars);
        }
      } catch (error) {
        console.log(error);        
      }finally{
        if(isMounted){
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  },[user]);

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  },[netInfo.isConnected])

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true
  //   })
  // }, [])

 

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + event.translationX;
      positionY.value = event.translationY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  function handleCarDetails(car: ModelCar) {
    navigation.navigate("CarDetails", { car });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CartList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      {/* <PanGestureHandler
      onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons color={theme.colors.shape} size={32} name="ios-car-sport" />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
