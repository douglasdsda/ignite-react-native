import React, { useState, useRef } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";
import { Bullet } from "../Bullet";

import {
  Container,
  ImageIndexes,
 
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChange = useRef((info: ChangeImageProps) => {
    console.log(info)
    setImageIndex(info.viewableItems[0].index!)
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((item, index) => (
            <Bullet key={String(item.id)} active={imageIndex == index ? true : false} />
          ))
        }
   
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
