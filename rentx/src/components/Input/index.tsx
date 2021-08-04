import React, { useState } from "react";

import { Container, IconContainer, InputText } from "./styles";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { RectButtonProps } from "react-native-gesture-handler";
import { TextInputProps } from "react-native";
import { set } from "date-fns";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value,...rest }: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocued() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }
 

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocued}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
}
