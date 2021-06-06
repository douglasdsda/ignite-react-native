import React from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

import { Container, Category, Icon } from "./styles";

// type Props = TextInputProps;

interface Props{
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down"></Icon>
    </Container>
  );
}
