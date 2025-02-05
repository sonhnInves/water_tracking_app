import {FlatList, View} from "react-native";
import styles from "./styles.ts";
import Icon from "react-native-vector-icons/Ionicons";
import {TextFontSemiBold} from "../../components/text";
import {AppColors} from "../../shared/constants";
import {navigateGoBack} from "../../utils/navigations.ts";
import {useEffect, useState} from "react";
import {getDailyWaterData} from "../../service/sqlite";
import {FormatDateUtils} from "../../utils/functions.ts";
import {History} from "../../service/models";
import {DailyData} from "../home/utils.ts";

const HistoryScreen = () => {
    const [data, setData] = useState<History[]>([])
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getDailyWaterData()
                const waterTrackingArray = Object.entries(data).filter(([key]) =>
                    key !== "achievedGoalDays" && key !== "dailyGoal").map(([key, value]) => ({
                    key,
                    value: value as DailyData
                }));
                setData(waterTrackingArray as History[])
            } catch (e) {
            }
        }
        loadData();
    }, []);
    return (<View style={styles.container}>
        <View style={styles.appbar}>
            <Icon name={'arrow-back-outline'} size={24} color="#fff" onPress={() => {
                navigateGoBack()
            }}/>
            <TextFontSemiBold fontSize={18}>History</TextFontSemiBold>
            <Icon name={'arrow-back-outline'} size={24} color={AppColors.backgroundColor}/>
        </View>
        <FlatList
            contentContainerStyle={{paddingHorizontal: 16}}
            data={data}
            renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextFontSemiBold>
                    {FormatDateUtils.eeDDMMYYYY(item.key)}
                </TextFontSemiBold>
                <TextFontSemiBold>
                    {item.value.dailyTotalWater / 1000}L
                </TextFontSemiBold>
            </View>}/>
    </View>)
}
export default HistoryScreen
