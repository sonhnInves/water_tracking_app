import {
    Animated,
    FlatList,
    ImageSourcePropType,
    StyleSheet, View,
} from 'react-native';
import {ImageAssets} from '../../../../../assets/imageAssets.ts';
import {TextFontSemiBold} from '../../../../components/text';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    createTable,
    getDBConnection,
    saveImageUser,
} from '../../../../service/sqlite';
import {TableName} from '../../../../service/tableName';
import {Pressable} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";

const Step6 = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedPetIndex, setSelectedPetIndex] = useState<number | null>(null);
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Độ trong suốt từ 0 -> 1
            duration: 2000, // Thời gian chạy (ms)
            useNativeDriver: true, // Sử dụng driver gốc
        }).start();
    }, [fadeAnim]);
    const imagePets: ImageSourcePropType[] = [
        ImageAssets.ImageOnboard6,
        ImageAssets.ImageOnboard7,
        ImageAssets.ImageOnboard8,
        ImageAssets.ImageOnboard9,
        ImageAssets.ImageOnboard10,
    ];
    const connectDataBase = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTable(db, TableName.ImageUser);
        } catch (e) {
            console.error(e);
        }
    }, []);
    useEffect(() => {
        connectDataBase();
    }, [connectDataBase]);

    const saveImage = async (image: ImageSourcePropType) => {
        const db = await getDBConnection();
        await saveImageUser(db, {image: image, id: 0}, TableName.ImageUser);
    };
    const renderItem = ({item, index}: { item: ImageSourcePropType, index: number }) => {
        const isSelected = index === selectedPetIndex;
        return <Pressable
            onPress={async () => {
                saveImage(item);
                setSelectedPetIndex(index)
            }}>
            <Animated.Image
                source={item}
                style={{...styles.item, opacity: fadeAnim}}
                resizeMode={'cover'}
            />
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 10,
                display: isSelected ? 'flex' : 'none'
            }}>
                <Icon name={'checkmark-circle'} size={30} color={'green'}/>
            </View>
        </Pressable>
    }
    return (
        <FlatList
            data={imagePets}
            numColumns={2}
            contentContainerStyle={{alignItems: 'center', rowGap: 8}}
            ListHeaderComponent={
                <TextFontSemiBold style={{paddingVertical: 24}}>
                    Choose your Hydration Pals!
                </TextFontSemiBold>
            }
            renderItem={renderItem}
        />
    );
};
const styles = StyleSheet.create({
    item: {
        margin: 8,
        width: 124,
        height: 135,
    },
});
export default Step6;
