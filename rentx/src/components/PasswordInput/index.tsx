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
    <Container>
      <IconContainer isFocused={isFocused}>
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
        isFocused={isFocused}
        secureTextEntry={isPasswordVisible}
        autoCorrect={false}
        {...rest}
      />
      <BorderlessButton
        onPress={() => setIsPasswordVisible((prevState) => !prevState)}
      >
        <IconContainer isFocused={isFocused}>
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
