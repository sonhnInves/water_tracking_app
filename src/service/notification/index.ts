import PushNotification from 'react-native-push-notification';
import {Alert, Platform} from "react-native";

export const requestNotificationPermission = () => {
    if (Platform.OS === 'ios' || (Platform.OS === 'android')) {
        PushNotification.requestPermissions().then((response) => {
            if (!response.alert) {
                Alert.alert('Permission denied. Please enable notifications in settings.');
            } else {
                console.log('Notification permission granted:', response);
            }
        });
    } else {
        console.log('Android does not require explicit notification permissions.');
    }
};
export const configureNotification = () => {
    PushNotification.configure({
        onNotification: function (notification) {
            console.log('Notification Received:', notification);
            if (notification.foreground) {
                console.log('---------')
            }
        },
        onAction: function (notification) {
            console.log('Notification Received:', notification);
        },
        requestPermissions: true,
    });
};

export const scheduleWaterReminder = (timeInterval: number) => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotificationSchedule({
        channelId: 'water-reminder', // ID kênh thông báo
        title: 'Uống Nước Ngay!',
        message: 'Đừng quên uống nước để giữ sức khỏe! 💧',
        date: new Date(Date.now() + timeInterval * 1000), // Thời gian thông báo
        allowWhileIdle: true,
        repeatType: 'minute', // Lặp lại sau mỗi khoảng thời gian
        repeatTime: timeInterval * 1000, // Lặp lại theo thời gian đã chỉ định
    });
};

export const createNotificationChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'water-reminder', // ID duy nhất của kênh
            channelName: 'Water Reminder Notifications', // Tên hiển thị của kênh
            importance: 4, // Mức độ ưu tiên (4: High)
            vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`) // Log trạng thái kênh
    );
};

