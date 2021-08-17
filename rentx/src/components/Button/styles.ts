import styled, { css } from "styled-components/native";

import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  color?: string;
}
interface LightProps {
  light?: boolean;
}

export const Container = styled(RectButton)<Props>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text<LightProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
