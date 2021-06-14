import React, { useContext } from "react";
import { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { useTheme } from "styled-components";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  async function handlesignInWithGoogle() {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Não foi possivel conectar com conta Google");
    }
  }

  async function handlesignInWithApple() {
    try {
      setLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Não foi possivel conectar com conta Google");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {`\n`}
            finanças de forma {`\n`}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {`\n`}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handlesignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handlesignInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
        {loading && (
          <ActivityIndicator size="large" color={theme.colors.shape} />
        )}
      </Footer>
    </Container>
  );
}
