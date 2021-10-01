import React from 'react';
 import { TextInputProps } from 'react-native'

  import { Container } from './styles';

// type Props = TextInputProps;

interface Props extends TextInputProps {
  active?: boolean;
}

function Input  ({ active = false,...rest }: Props)   {
  return (<Container active={active} {...rest }>

  </Container >)
}

export default Input;