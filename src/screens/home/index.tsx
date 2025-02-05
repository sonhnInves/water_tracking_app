import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {getDailyWaterData, saveDailyWaterData} from '../../service/sqlite';
import {AppColors, ScreenName} from "../../shared/constants";
import {DateUtil, marginTopApp} from "../../utils/functions.ts";
import HumanBody from "../../components/human_body";
import {
    BodyData,
    DailyData,
    getFormattedBodyData,
    getUpdatedAddWaterAmountData,
    getUpdatedRemoveWaterAmountData
} from "./utils.ts";
import {Pressable} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles.ts";
import {TextFontSemiBold} from "../../components/text";
import {navigate} from "../../utils/navigations.ts";

const HomeScreen = () => {
    const drinkWater = [200, 300, 400, 500]
    const [isLoading, setIsLoading] = useState(false);
    const [mlWater, setMlWater] = useState(0)
    const [waterIndex, setWaterIndex] = useState<number | null>(null);
    const today = DateUtil.today()
    const [data, setData] = useState<BodyData & { achievedGoalDays: number }>({
        achievedGoalDays: 0, dailyGoal: 2000, [today]: {
            dailyTotalWater: 0,
            achieved: false,
        },
    })
    useEffect(() => {
        const loadWaterData = async () => {
            try {
                setIsLoading(true)
                const data = await getDailyWaterData();
                setData(data);
            } catch (e) {

            } finally {
                setIsLoading(false)
            }
        }
        loadWaterData()
    }, []);
    const onAddWaterAmount = async (amount: number) => {
        const updatedData = getUpdatedAddWaterAmountData(data, amount);
        setData(updatedData);
        await saveDailyWaterData(updatedData)
    }
    const onRemoveWater = async (amount: number) => {
        const updatedData = getUpdatedRemoveWaterAmountData(data, amount);
        setData(updatedData);
        await saveDailyWaterData(updatedData)
    };
    const renderItem = (item: number, index: number) => {
        return <Pressable onPress={() => {
            setWaterIndex(index)
            setMlWater(item)
        }}>
            <View
                style={{...styles.itemWater, borderColor: waterIndex === index ? '#088ECF' : AppColors.white}}>
                <TextFontSemiBold
                    color={waterIndex === index ? '#088ECF' : AppColors.white}>{item} ml</TextFontSemiBold>
            </View>
        </Pressable>
    }
    const dailyTotalWater = data[today] && typeof data[today] === "object" ? (data[today] as DailyData).dailyTotalWater : 0;
    return (
        <>
            {isLoading ? <ActivityIndicator size="large" color={AppColors.backgroundColor}/> :
                <ScrollView style={{backgroundColor: AppColors.backgroundColor, paddingTop: marginTopApp()}}>
                    <TextFontSemiBold textAlign={'right'} style={{paddingRight: 16}} onPress={() => {
                        navigate({screen: ScreenName.HistoryScreen})
                    }}>
                        History
                    </TextFontSemiBold>
                    <View style={{flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between'}}>
                        <View style={{alignItems: 'center'}}>
                            <TextFontSemiBold fontSize={22}>
                                {dailyTotalWater === undefined ? 0 : dailyTotalWater / 1000}L
                            </TextFontSemiBold>
                            <TextFontSemiBold>
                                TOTAL WATER
                            </TextFontSemiBold>
                            <TextFontSemiBold>
                                DRUNK
                            </TextFontSemiBold>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TextFontSemiBold fontSize={22}>
                                {data.achievedGoalDays}
                            </TextFontSemiBold>
                            <TextFontSemiBold>
                                ACHIEVED GOAL
                            </TextFontSemiBold>
                            <TextFontSemiBold>
                                {data.achievedGoalDays === 0 ? 'DAY' : 'DAYS'}
                            </TextFontSemiBold>
                        </View>
                    </View>
                    <HumanBody data={getFormattedBodyData(data)}/>
                    <FlatList scrollEnabled={false} data={drinkWater} horizontal={true}
                              contentContainerStyle={styles.flatList}
                              renderItem={({item, index}) => renderItem(item, index)}/>
                    <View style={styles.row}>
                        <Pressable style={{...styles.circleButton, marginRight: 10}}
                                   onPress={() => {
                                       onRemoveWater(mlWater)
                                   }}>
                            <Icon name={'remove-outline'} size={30} color={AppColors.white}/>
                        </Pressable>
                        <Pressable style={{...styles.circleButton, marginLeft: 10}}
                                   onPress={() => {
                                       if (dailyTotalWater !== undefined && dailyTotalWater < 2000) {
                                           if (waterIndex !== null) return onAddWaterAmount(mlWater)
                                       }
                                   }}>
                            <Icon name={'add-outline'} size={30} color={AppColors.white}/>
                        </Pressable>
                    </View>
                </ScrollView>
            }
        </>

    );
};
export default HomeScreen;
