import {StyleSheet, View} from "react-native";
import {AppColors, ScreenName} from "../../shared/constants";
import {TextFontSemiBold} from "../../components/text";
import {useEffect} from "react";
import {checkTableExists, getDBConnection} from "../../service/sqlite";
import {TableName} from "../../service/tableName";
import {navigate} from "../../utils/navigations.ts";

const SplashScreen = () => {
    useEffect(() => {

        const timeout = setTimeout(async () => {
            const db = await getDBConnection()
            const exists = await checkTableExists(db, TableName.ImageUser);
            if (exists) {
                navigate({screen: ScreenName.HomeScreen})
            } else {
                navigate({screen: ScreenName.OnboardScreen})
            }
        }, 1000)
        return () => clearTimeout(timeout)
    }, []);
    return <View style={styles.container}>
        <TextFontSemiBold fontSize={22}>
            Drops Water Tracker
        </TextFontSemiBold>
        <TextFontSemiBold>
            Stay hydrated and track your
        </TextFontSemiBold>
        <TextFontSemiBold>
            daily water intake
        </TextFontSemiBold>
    </View>
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center', alignSelf: 'center',
        backgroundColor: AppColors.backgroundColor, flex: 1, width: '100%'
    },
})
export default SplashScreen
