import {Animated, ScrollView} from 'react-native';
import {TextFontMedium} from '../../../../components/text';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';
import {useEffect, useRef} from 'react';

const Step2 = () => {
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
      <TextFontMedium
        fontSize={16}
        textAlign={'center'}
        style={{paddingHorizontal: 16, paddingVertical: 24}}>
        "Make every sip count! Staying hydrated boosts your energy and keeps you
        feeling fantastic throughout the day." 💧🌟
      </TextFontMedium>
      <Animated.Image
        source={ImageAssets.ImageOnboard2}
        style={{
          width: '100%',
          height: 346,
          opacity: fadeAnim,
          marginTop: '15%',
        }}
        resizeMode={'cover'}
      />
    </ScrollView>
  );
};
export default Step2;
