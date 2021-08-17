import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import Gasoline from "../../assets/gasoline.svg";
import { Car as ModelCar } from "../../database/model/Car";
import { getAccessoryIcon } from "../../util/getAccessoryIcon";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: Props) {

  const netInfo = useNetInfo();
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{
           netInfo.isConnected ? data.price : '...'
            }</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        resizeMode="contain"
        source={{
          uri: data.thumbnail,
        }}
      />
    </Container>
  );
}
