/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar,} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import MainApp from "./src/main";
import {AppColors} from "./src/shared/constants";
import {
    configureNotification,
    createNotificationChannel,
    requestNotificationPermission,
    scheduleWaterReminder
} from "./src/service/notification";

function App(): React.JSX.Element {
    useEffect(() => {
        requestNotificationPermission()
        // Cấu hình thông báo
        configureNotification();

        // Tạo kênh thông báo (Chỉ Android)
        createNotificationChannel();

        // Lên lịch nhắc nhở uống nước mỗi 2 giờ
        scheduleWaterReminder(60); // 2 giờ = 2 * 60 * 60 giây
    }, []);
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
