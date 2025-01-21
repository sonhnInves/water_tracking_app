import {FlatList, ScrollView, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {ImageUser} from '../../service/models';
import {getDBConnection, getImageUser} from '../../service/sqlite';
import {TableName} from '../../service/tableName';
import {AppColors} from "../../shared/constants";
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

const HomeScreen = () => {
    const drinkWater = [200, 300, 400, 500]
    const [mlWater, setMlWater] = useState(0)
    const [waterIndex, setWaterIndex] = useState<number | null>(null);
    const [image, setImage] = useState<ImageUser>();
    const today = DateUtil.today()
    const [data, setData] = useState<BodyData & { achievedGoalDays: number }>({
        achievedGoalDays: 0, dailyGoal: 2000, [today]: {
            dailyTotalWater: 0,
            achieved: false,
        },
    })
    const loadData = useCallback(async () => {
        const db = await getDBConnection();
        const storedImage = await getImageUser(db, TableName.ImageUser);
        setImage(storedImage);
    }, []);
    useEffect(() => {
        loadData();
    }, [loadData]);
    const onAddWaterAmount = (amount: number) => {
        const updatedData = getUpdatedAddWaterAmountData(data, amount);
        setData(updatedData);
    }
    const onRemoveWater = (amount: number) => {
        const updatedData = getUpdatedRemoveWaterAmountData(data, amount);
        setData(updatedData);
    };
    console.log({data})
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
    const dailyTotalWater =
        typeof data[today] === "object" ? (data[today] as DailyData).dailyTotalWater : 0;
    return (
        <ScrollView style={{backgroundColor: AppColors.backgroundColor, paddingTop: marginTopApp()}}>
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
                                   onAddWaterAmount(mlWater)
                               }
                           }}>
                    <Icon name={'add-outline'} size={30} color={AppColors.white}/>
                </Pressable>
            </View>
        </ScrollView>
    );
};
export default HomeScreen;
