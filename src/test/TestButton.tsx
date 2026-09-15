import React, {ComponentPropsWithoutRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import useRestyle from '../hooks/useRestyle';
import {position, PositionProps} from '../restyleFunctions';
import createVariant, {VariantProps} from '../createVariant';
import composeRestyleFunctions from '../composeRestyleFunctions';

type Theme = {
  colors: {};
  spacing: {};
  buttonVariants: {defaults: {}};
  breakpoints: {phone: number; tablet: number};
  zIndices: {phone: number};
};

type TouchableProps = ComponentPropsWithoutRef<typeof TouchableOpacity>;

type Props = VariantProps<Theme, 'buttonVariants'> &
  PositionProps<Theme> &
  Omit<TouchableProps, 'style'>;

const restyleFunctions = [
  position,
  createVariant<Theme>({themeKey: 'buttonVariants'}),
];

const composedRestyleFunction = composeRestyleFunctions<Theme, Props>(
  restyleFunctions,
);

export function Button({title, ...rest}: Props & {title: string}) {
  const props = useRestyle(composedRestyleFunction, rest);
  return (
    <TouchableOpacity {...(props as TouchableProps)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
