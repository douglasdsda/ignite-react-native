import React, { useState } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { getAccessoryIcon } from "../../util/getAccessoryIcon";
import { format } from "date-fns";

import {
  Container,
  Header,
  CardImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { Car as CarModel } from "../../database/model/Car";
import { useEffect } from "react";
import { getPlatformDate } from "../../util/getPlataformDate";
import api from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarModel;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentTotal = Number(dates.length * car.price);
  const netInfo = useNetInfo();

  async function handleConfirmRental() {
    setLoading(true);
    // const schedulesByCar = await api.get(`schedules_bycars/${car.id}`);

    // const unavailable_dates = [
    //   ...schedulesByCar.data.unavailable_dates,
    //   ...dates,
    // ];

    await api
      .post(`rentals`, {
        user_id: 1,
        car_id: 1,
        // start_date: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        // end_date: format(
        //   getPlatformDate(new Date(dates[dates.length - 1])),
        //   "dd/MM/yyyy"
        // ),
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })

      // api
      //   .put(`schedules_bycars/${car.id}`, {
      //     id: car.id,
      //     unavailable_dates,
      //   })
      .then((r) => {
        console.log(r);
        navigation.navigate("Confirmation", {
          title: "Carro alugado!",
          message:
            "Agora você só precisa ir\n até a concessionária da RNTX\n pegar o seu automóvel",
          nextScreen: "Home",
        });
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("Erro", "Ao tentar enviar");
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdate() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdate();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CardImages>
        {/* <ImageSlider imagesUrl={car.photos} /> */}
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [
                  {
                    id: car.thumbnail,
                    photo: car.thumbnail,
                  },
                ]
          }
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Acessories>
            {carUpdated.accessories.map((acessory) => (
              <Accessory
                key={acessory.name}
                name={acessory.name}
                icon={getAccessoryIcon(acessory.type)}
              />
            ))}
          </Acessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diarias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
