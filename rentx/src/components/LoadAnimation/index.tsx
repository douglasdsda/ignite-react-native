import React from "react";

import { Container } from "./styles";
import loadingCar from "../../assets/json_animated.json";
import LottieView from "lottie-react-native";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
