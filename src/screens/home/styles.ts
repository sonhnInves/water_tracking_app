import {StyleSheet} from 'react-native';

const HUMAN_BODY_WIDTH = 147;
const HUMAN_BODY_HEIGHT = 338;
const styles = StyleSheet.create({
  graphic: {
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  humanBody: {
    flexDirection: 'column-reverse',
    width: HUMAN_BODY_WIDTH,
    height: HUMAN_BODY_HEIGHT,
  },
  progress: {
    width: '100%',
    backgroundColor: '#088ECF',
  },
});
export default styles;
