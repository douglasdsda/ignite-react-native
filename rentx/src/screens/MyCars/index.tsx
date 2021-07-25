import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

import { BackButton } from "../../components/BackButton";
import { Load } from "../../components/Load";
import { AntDesign } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { useTheme } from "styled-components";
import { CarDTO } from "../../dtos/CarDTO";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarProps[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const loads = async () => {
      try {
        const response = await api.get(`schedules_byuser?user_id=1`);

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loads();
  }, []);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <Title>
          Escolha uma {`\n`}
          data de início e {`\n`}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarTitle>Período</CarTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
