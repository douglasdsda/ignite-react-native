import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTrasaction,
} from "./styles";

interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTrasaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({ amount, lastTrasaction, title, type }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTrasaction type={type}>{lastTrasaction}</LastTrasaction>
      </Footer>
    </Container>
  );
}
