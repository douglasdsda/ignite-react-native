import React from "react";

import { Container, Title } from "./styles";
import { useTheme } from "styled-components";

import { RectButtonProps } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
 
  loading?: boolean;
  light?: boolean;
}

export function Button({
  color,
  enabled = true,
  onPress,
  loading = false,
  title,
  light = false
}: Props) {
  const theme = useTheme();
  return (
    <Container
      enabled={enabled}
      color={color ? color : theme.colors.main}
      onPress={onPress}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
