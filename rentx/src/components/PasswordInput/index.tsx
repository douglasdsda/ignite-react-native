import React from "react";

import { Container, IconContainer, InputText } from "./styles";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import {
  BorderlessButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import { TextInputProps } from "react-native";
import { useState } from "react";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocued() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
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
        secureTextEntry={isPasswordVisible}
        {...rest}
        onFocus={handleInputFocued}
        onBlur={handleInputBlur}
      />
      <BorderlessButton
        onPress={() => setIsPasswordVisible((prevState) => !prevState)}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
