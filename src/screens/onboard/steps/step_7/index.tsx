import {ScrollView} from 'react-native';
import {TextFontBold} from '../../../../components/text';

const Step7 = () => {
  return (
    <ScrollView>
      <TextFontBold
        fontSize={35}
        textAlign={'center'}
        style={{marginTop: '20%', marginBottom: 16}}>
        All Done!
      </TextFontBold>
      <TextFontBold fontSize={16} textAlign={'center'}>
        Start drinking and stay refreshed with AquaPal. Enjoy!
      </TextFontBold>
    </ScrollView>
  );
};
export default Step7;
