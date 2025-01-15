import {NavigationContainer} from '@react-navigation/native';
import {ScreenName} from '../shared/constants';
import OnboardScreen from '../screens/onboard';
import HomeScreen from '../screens/home';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../utils/navigations.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={ScreenName.OnboardScreen}
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={ScreenName.OnboardScreen}
            component={OnboardScreen}
          />
          <Stack.Screen
            name={ScreenName.HomeScreen}
            component={HomeScreen}
            options={{gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default MainApp;
