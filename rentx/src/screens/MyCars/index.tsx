import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { useIsFocused} from '@react-navigation/core'
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
import { LoadAnimation } from "../../components/LoadAnimation";
import { AntDesign } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { Car as CarModel } from "../../database/model/Car";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { useTheme } from "styled-components";
import { CarDTO } from "../../dtos/CarDTO";

 
interface DataProps {
  id: string;
  
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<DataProps[]>([]);
  const theme = useTheme();
  const screenIsFocus = useIsFocused()
  useEffect(() => {
    const loads = async () => {
      try {
        // const response = await api.get(`schedules_byuser?user_id=1`);
        const response = await api.get(`rentals`);
        console.log('RESPONSE: ', response.data)
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loads();
  }, [screenIsFocus]);

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
        <LoadAnimation />
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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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
