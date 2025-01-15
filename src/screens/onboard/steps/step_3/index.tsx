import {Animated, ScrollView} from 'react-native';
import {TextFontMedium, TextFontSemiBold} from '../../../../components/text';
import React, {useEffect, useRef} from 'react';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';

const Step3 = () => {
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
        Your Daily Goal!
      </TextFontSemiBold>
      <TextFontMedium
        textAlign={'center'}
        style={{paddingHorizontal: 24, paddingTop: 16}}>
        Sip smart and shine bright! Staying hydrated is the key to unlocking
        your best self every day.🌟
      </TextFontMedium>
      <Animated.Image
        source={ImageAssets.ImageOnboard3}
        style={{
          width: 249,
          height: 294,
          opacity: fadeAnim,
          alignSelf: 'center',
        }}
        resizeMode={'cover'}
      />
    </ScrollView>
  );
};
export default Step3;
