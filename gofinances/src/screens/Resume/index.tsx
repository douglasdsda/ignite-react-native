import React, { useState, useEffect, useCallback } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";

import { useFocusEffect } from "@react-navigation/native";
import { ptBR } from "date-fns/locale";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MothSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth()

  const theme = useTheme();

  async function handleChangeDate(action: "next" | "prev") {
 
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
   await AsyncStorage.removeItem(`@gofinances:transactions`);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const totalByCategory = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    const totalCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = categorySum / totalByCategory;
        // const percentFormatted = `${percent.toFixed(0)}%`
        const percentFormatted = `${(
          (categorySum / totalByCategory) *
          100
        ).toFixed(0)}%`;

        totalCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          key: category.key,
          percent,
          percentFormatted,
        });
      }
    });

    setCategoriesData(totalCategory);
    setIsLoading(false);
  }

 

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MothSelectButton onPress={() => handleChangeDate("prev")}>
                <MonthSelectIcon name="chevron-left" />
              </MothSelectButton>

              <Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </Month>

              <MothSelectButton onPress={() => handleChangeDate("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MothSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={categoriesData}
                colorScale={categoriesData.map((category) => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: "bold",
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={50}
                x="percentFormatted"
                y="total"
              />
            </ChartContainer>
            {categoriesData.map((category) => (
              <HistoryCard
                key={category.key}
                title={category.name}
                amount={category.totalFormatted}
                color={category.color}
              />
            ))}
          </Content>
        </>
      )}
    </Container>
  );
}
