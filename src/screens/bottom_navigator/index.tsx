// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Animated, StyleSheet, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import React from 'react';
// import HomeScreen from '../home';
//
// const Tab = createBottomTabNavigator();
//
// const BottomNavigator = () => {
//   const AnalyticsScreen = () => (
//     <View style={styles.screen}>
//       <Text>Analytics Screen</Text>
//     </View>
//   );
//
//   const SettingsScreen = () => (
//     <View style={styles.screen}>
//       <Text>Settings Screen</Text>
//     </View>
//   );
//
//   const ProfileScreen = () => (
//     <View style={styles.screen}>
//       <Text>Profile Screen</Text>
//     </View>
//   );
//   const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
//     const scale = React.useRef(new Animated.Value(1)).current;
//
//     React.useEffect(() => {
//       Animated.timing(scale, {
//         toValue: focused ? 1.3 : 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }, [focused, scale]);
//
//     return (
//       <Animated.View
//         style={{
//           transform: [{scale}],
//           alignItems: 'center',
//           justifyContent:'center',
//           alignSelf:'center'
//         }}>
//         <Icon name={name} size={25} color={focused ? '#FFF' : '#8F8F8F'}/>
//       </Animated.View>
//     );
//   };
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBarStyle,
//         headerShown: false,
//         tabBarIcon: ({focused}) => {
//           let iconName: string = '';
//
//           if (route.name === 'Home') {
//             iconName = 'home-outline';
//           } else if (route.name === 'Analytics') {
//             iconName = 'bar-chart-outline';
//           } else if (route.name === 'Settings') {
//             iconName = 'settings-outline';
//           } else if (route.name === 'Profile') {
//             iconName = 'person-outline';
//           }
//
//           return <TabIcon name={iconName} focused={focused} />;
//         },
//       })}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Analytics" component={AnalyticsScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//   },
//   tabBarStyle: {
//     position: 'absolute',
//     height: 70,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     backgroundColor: '#18181e',
//     borderTopWidth: 0,
//   },
// });
// export default BottomNavigator;
