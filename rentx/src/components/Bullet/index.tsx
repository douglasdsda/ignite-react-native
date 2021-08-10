import React from "react";
 

import { Container } from "./styles";
import { useTheme } from "styled-components";
 
interface Props  {
  active?: boolean;
}

export function Bullet({ active = false }: Props) {
  const theme = useTheme();
  return (
    <Container active={active} />
 
 
  );
}
