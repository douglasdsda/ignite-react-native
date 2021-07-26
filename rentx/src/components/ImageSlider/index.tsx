import React, { useState, useRef } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
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
          imagesUrl.map((_, index) => (
            <ImageIndex key={String(index)} active={imageIndex == index ? true : false} />
          ))
        }
   
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
