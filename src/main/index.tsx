import {NavigationContainer} from '@react-navigation/native';
import {ScreenName} from '../shared/constants';
import OnboardScreen from '../screens/onboard';
import HomeScreen from '../screens/home';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../utils/navigations.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getDBConnection, getImageUser} from "../service/sqlite";
import {TableName} from "../service/tableName";
import {ImageUser} from "../service/models";
import SplashScreen from "../screens/splash_screen";
import HistoryScreen from "../screens/history";

const Stack = createStackNavigator();

const MainApp = () => {
    const [image, setImage] = useState<ImageUser>();
    const getDataBase = async () => {
        const db = await getDBConnection();
        const storedImage = await getImageUser(db, TableName.ImageUser);
        setImage(storedImage);
    }
    useEffect(() => {
        getDataBase();
    }, []);
    return (
        <GestureHandlerRootView>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    initialRouteName={ScreenName.SplashScreen}
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name={ScreenName.SplashScreen}
                        component={SplashScreen}/>
                    <Stack.Screen
                        name={ScreenName.OnboardScreen}
                        component={OnboardScreen}
                    />
                    <Stack.Screen
                        name={ScreenName.HomeScreen}
                        component={HomeScreen}
                        options={{gestureEnabled: false}}
                    />
                    <Stack.Screen
                        name={ScreenName.HistoryScreen}
                        component={HistoryScreen}
                        options={{gestureEnabled: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
export default MainApp;
