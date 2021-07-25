import React from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

 

import {getAccessoryIcon} from "../../util/getAccessoryIcon"
 

import {
  Container,
  Header,
  CardImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}

export function CarDetails() {

  const navigation = useNavigation()
  const route = useRoute()
  const { car  } = route.params as Params

  function handleConfirmRental(){
    navigation.navigate('Sheduling', {car })
  }
  function handleBack(){
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CardImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
        {car.accessories.map(accessory => (
           
           <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
        ))} 
   
        </Acessories>

    

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title="Escolher periodo do alugel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
