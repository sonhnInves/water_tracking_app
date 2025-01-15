import {Platform} from 'react-native';

export const ScreenName = {
  OnboardScreen: 'OnboardScreen',
  HomeScreen: 'HomeScreen',
  Main: 'Main',
  BottomNavigationScreen: 'BottomNavigationScreen',
};

export const AppColors = {
  backgroundColor: '#0E1021',
};

export const Fonts = {
  PoppinsBold: Platform.OS === 'ios' ? 'Poppins Bold' : 'Poppins-Bold',
  PoppinsSemiBold: Platform.OS === 'ios' ? 'Poppins SemiBold' : 'Poppins-SemiBold',
  PoppinsMedium: Platform.OS === 'ios' ? 'Poppins Medium' : 'Poppins-Medium',
  PoppinsRegular: Platform.OS === 'ios' ? 'Poppins Regular' : 'Poppins-Regular',
};
