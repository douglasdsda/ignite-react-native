import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { useFocusEffect } from "@react-navigation/native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTrasaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const { signOut, user } = useAuth();

  let entriesTotal = 0;
  let expensiveTotal = 0;

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFiltered = collection.filter((item) => item.type === type);

    if (collectionFiltered.length == 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function loadTransaction() {
    entriesTotal = 0;
    expensiveTotal = 0;

    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type == "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          category: item.category,
          type: item.type,
        };
      }
    );
    setData(transactionsFormatted);

    const lastTransactionDateEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionDateExpresives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval =
      lastTransactionDateExpresives === 0
        ? `Não há transações`
        : `01 a ${lastTransactionDateExpresives}`;

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTrasaction:
          lastTransactionDateEntries === 0
            ? `Não há transações`
            : `Ùltima entrada dia ${lastTransactionDateEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTrasaction:
          lastTransactionDateExpresives === 0
            ? `Não há transações`
            : `Ùltima saida dia ${lastTransactionDateExpresives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTrasaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Ola, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton>
                <Icon name="power" onPress={signOut} />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTrasaction={highlightData.entries.lastTrasaction}
            />
            <HighlightCard
              type="down"
              title="Saidas"
              amount={highlightData.expensives.amount}
              lastTrasaction={highlightData.expensives.lastTrasaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTrasaction={highlightData.total.lastTrasaction}
            />

            <HighlightCards />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              renderItem={({ item }) => <TransactionCard data={item} />}
              data={data}
              keyExtractor={(item) => item.id}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
