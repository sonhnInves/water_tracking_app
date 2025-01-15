import {TextFontMedium, TextFontSemiBold} from '../../../../components/text';
import {Animated, ScrollView} from 'react-native';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';
import React, {useEffect, useRef} from 'react';
import styles from './styles.tsx';

const Step1 = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Độ trong suốt từ 0 -> 1
      duration: 2000, // Thời gian chạy (ms)
      useNativeDriver: true, // Sử dụng driver gốc
    }).start();
  }, [fadeAnim]);
  return (
    <ScrollView>
      <TextFontSemiBold fontSize={35} textAlign={'center'}>
        Welcome aboard! 💧
      </TextFontSemiBold>
      <Animated.Image
        source={ImageAssets.ImageOnboard1} // Thay bằng đường dẫn ảnh
        style={{...styles.image, opacity: fadeAnim}}
      />
      <TextFontMedium textAlign={'center'}>
        Ready to crush your hydration goals?
      </TextFontMedium>
      <TextFontMedium textAlign={'center'}>
        We’ve got your back with easy tracking,
      </TextFontMedium>
      <TextFontMedium textAlign={'center'}>
        friendly reminders, and cool stats.
      </TextFontMedium>
      <TextFontMedium textAlign={'center'}>
        Let’s get sipping and stay refreshed! 🥤🚀
      </TextFontMedium>
    </ScrollView>
  );
};
export default Step1;
