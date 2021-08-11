import { useNavigation, useRoute } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";

import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  Steps,
  Title,
  Sutitle,
  Form,
  FormTitle,
} from "./styles";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import api from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      if (!password || !setPassword) {
        return Alert.alert("Ops", "Informe a senha e a confirmação dela.");
      }

      if (password != confirmPassword) {
        return Alert.alert("Senha é diferente de password");
      }

      await api
        .post("/users", {
          name: user.name,
          email: user.email,
          driver_license: user.driverLicense,
          password,
        })
        .then(() => {
          navigation.navigate("Confirmation", {
            title: "Conta Criada!",
            message: `Agora é só fazer login\n e aproveitar`,
            nextScreen: "Signin",
          });
        })
        .catch(() => {
          Alert.alert("Opa", "Não foi possivel cadastrar.");
        });
    } catch (error) {
      if (error instanceof Error) {
        return Alert.alert("Opa", error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Sutitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Sutitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
            />

            <PasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              iconName="lock"
              placeholder="Repetir Senha"
            />
          </Form>

          <Button
            onPress={handleRegister}
            color={theme.colors.success}
            title="Cadastrar"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
