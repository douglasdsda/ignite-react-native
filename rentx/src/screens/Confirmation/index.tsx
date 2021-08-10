import React from "react";

import { useTheme } from "styled-components";
import { useWindowDimensions, StatusBar } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Foooter } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const theme = useTheme();
  const route = useRoute();
  const { width } = useWindowDimensions();

  const { title, message, nextScreen} = route.params as Params;

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate(nextScreen);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        {/* <Title>Carro alugado!</Title> */}
        <Title>{title}</Title>

        {/* <Message>
          Agora você só precisa ir {`\n`}
          até a concessionária da RNTX {`\n`}
          pegar o seu automóvel
        </Message> */}
        <Message>{message}</Message>
      </Content>

      <Foooter>
        <ConfirmButton title="Ok" onPress={handleConfirmRental} />
      </Foooter>
    </Container>
  );
}
