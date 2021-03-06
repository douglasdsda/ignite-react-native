import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import {Car as CarModel} from "../../database/model/Car"
export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  width: 100%;

  height: 113px;

  justify-content: flex-end;
  padding: 32px 24px;
`;
export const HeaderContent = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.primary_400};
`;
export const CartList = styled(FlatList as new () => FlatList<CarModel>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

 