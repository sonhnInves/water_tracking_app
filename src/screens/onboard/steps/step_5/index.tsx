import {Animated, ScrollView} from 'react-native';
import {TextFontMedium} from '../../../../components/text';
import {useEffect, useRef} from 'react';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';

const Step5 = () => {
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
        textAlign={'center'}
        fontSize={16}
        style={{paddingHorizontal: 16, paddingTop: 24}}>
        "Transform your routine with hydration! Each glass of water is a step
        towards a more energetic and healthy you. 💧💪"
      </TextFontMedium>
      <Animated.Image
        source={ImageAssets.ImageOnboard5}
        style={{
          opacity: fadeAnim,
          width: 308,
          height: 384,
          alignSelf: 'center',
        }}
      />
    </ScrollView>
  );
};
export default Step5;
