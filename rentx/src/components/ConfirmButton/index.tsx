import React from "react";
 

import { Container, Title } from "./styles";
 
 
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
 
  color?: string;
  title?: string;
 
}

export function ConfirmButton({ color,title, ...rest }: Props) {
 
  return (
    <Container color={color} {...rest }>
      <Title>{title}</Title>
    </Container>
  );
}
