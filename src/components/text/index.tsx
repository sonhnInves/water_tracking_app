import {StyleProp, Text, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {Fonts} from '../../shared/constants';

interface ITextWrapperProps {
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  textAlign?: 'left' | 'center' | 'right';
}

const TextComponent: React.FC<ITextWrapperProps> = ({
  fontFamily = Fonts.PoppinsSemiBold,
  color = '#fff',
  children,
  fontSize = 14,
  style,
  onPress,
  textAlign = 'left',
  ...restProps
}) => {
  return (
    <Text
      style={[style, {...restProps, fontFamily, color, fontSize, textAlign}]}
      onPress={onPress}>
      {children}
    </Text>
  );
};
export const TextFontBold = memo((props: ITextWrapperProps) => {
  let propsText = {...props, fontFamily: Fonts.PoppinsBold};
  return TextComponent(propsText);
});
export const TextFontSemiBold = memo((props: ITextWrapperProps) => {
  let propsText = {...props, fontFamily: Fonts.PoppinsSemiBold};
  return TextComponent(propsText);
});

export const TextFontMedium = memo((props: ITextWrapperProps) => {
  let propsText = {...props, fontFamily: Fonts.PoppinsMedium};
  return TextComponent(propsText);
});

export const TextFontRegular = memo((props: ITextWrapperProps) => {
  let propsText = {...props, fontFamily: Fonts.PoppinsRegular};
  return TextComponent(propsText);
});
