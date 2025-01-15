import {Animated, ScrollView} from 'react-native';
import {TextFontMedium} from '../../../../components/text';
import {useEffect, useRef} from 'react';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';

const Step4 = () => {
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
        style={{paddingHorizontal: 16, paddingTop: 24}}
        textAlign={'center'}>
        "Quench your thirst and elevate your mood! Regular water breaks are your
        secret to feeling refreshed and vibrant. 😊"
      </TextFontMedium>
      <Animated.Image
        source={ImageAssets.ImageOnboard4}
        style={{height: 439, width: '100%', opacity: fadeAnim}}
      />
    </ScrollView>
  );
};
export default Step4;
