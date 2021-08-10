import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import * as Yup from 'yup'

import {
  Container,
  Header,
  Steps,
  Title,
  Sutitle,
  Form,
  FormTitle,
} from "./styles";

export const SignUpFirstStep: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNext() {
     try {


      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),  
        email: Yup.string()
        .email('E-mail inválido')
         .required('E-mail é obrigatório'),
        name: Yup.string()
        .required('Nome é obrigatório'),
      })

      const data = { name, email, driverLicense}
      await schema.validate(data)

      navigation.navigate("SignUpSecondStep", {
        user: data
      });
     } catch (error) {
       if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
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
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Sutitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Sutitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              onChangeText={setName}
              value={name}
              iconName="user"
              placeholder="Nome"
            />
            <Input
              onChangeText={setEmail}
              value={email}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              onChangeText={setDriverLicense}
              value={driverLicense}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button onPress={handleNext} title="Próximo" />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
