import React from "react";

import { Container, Title } from "./styles";
import { useTheme } from "styled-components";

import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({ color, title, onPress }: Props) {
  const theme = useTheme();
  return (
    <Container color={color ? color : theme.colors.main} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
