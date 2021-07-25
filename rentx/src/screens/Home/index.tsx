import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CartList,
  MyCarsButton,
} from "./styles";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { useTheme } from "styled-components";

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const loads = async () => {
      try {
        const response = await api.get("cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loads();
  }, []);

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  function handleCarDetails(car: CarDTO) {
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
          <TotalCars>Total {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CartList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons color={theme.colors.shape} size={32} name="ios-car-sport" />
      </MyCarsButton>
    </Container>
  );
}
