/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar,} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import MainApp from "./src/main";
import {AppColors} from "./src/shared/constants";

function App(): React.JSX.Element {

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="light-content"
                backgroundColor={AppColors.backgroundColor}
            />
            <MainApp/>
        </SafeAreaProvider>
    );
}


export default App;
