import {View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {marginTopApp} from '../../utils/functions.ts';
import {AppColors, ScreenName} from '../../shared/constants';
import PagerView from 'react-native-pager-view';
import {BaseButton} from 'react-native-gesture-handler';
import Step1 from './steps/step_1';
import PaginationDots from '../../components/pagination_dots';
import Step2 from './steps/step_2';
import Step3 from './steps/step_3/index.tsx';
import Step4 from './steps/step_4/index.tsx';
import Step5 from './steps/step_5';
import Step6 from './steps/step_6';
import Step7 from './steps/step_7';
import {navigate} from '../../utils/navigations.ts';
import Icon from 'react-native-vector-icons/Ionicons';
import {getDBConnection, getImageUser} from "../../service/sqlite";
import {TableName} from "../../service/tableName";

const OnboardScreen = () => {
    const viewPager = React.createRef<PagerView>();
    const [page, setPage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = [1, 2, 3, 4, 5, 6, 7]; // Total pages
    const handleScrollRight = async (event: any) => {
        const nextPage = event.nativeEvent.position;
        const db = await getDBConnection();
        const storedImage = await getImageUser(db, TableName.ImageUser);
        if (nextPage > currentIndex && JSON.stringify(storedImage) === '{}') {
            return viewPager.current?.setPageWithoutAnimation(currentIndex);
        }
    }
    const handleScroll = (event: any) => {
        const pageIndex = Math.round(event.nativeEvent.position);
        handleScrollRight(event)
        setPage(pageIndex);
        setCurrentIndex(pageIndex);
    };
    const handleNextPage = async () => {
        const db = await getDBConnection();
        const storedImage = await getImageUser(db, TableName.ImageUser);
        if (page === 5 && JSON.stringify(storedImage) === '{}') return;
        if (page !== data.length - 1) {
            setPage(page + 1);
            viewPager.current?.setPage(page);
            setCurrentIndex(page + 1);
        } else {
            navigate({screen: ScreenName.HomeScreen});
        }
    };
    const PageView = useCallback(() => {
        return (
            <PagerView
                initialPage={page}
                ref={viewPager}
                style={{flex: 1}}
                onPageScroll={handleScroll}>
                <Step1/>
                <Step2/>
                <Step3/>
                <Step4/>
                <Step5/>
                <Step6/>
                <Step7/>
            </PagerView>
        );
    }, [page, viewPager]);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: AppColors.backgroundColor,
                paddingTop: marginTopApp(),
            }}>
            <PageView/>
            <PaginationDots
                data={data}
                currentIndex={currentIndex}
                dotStyle={{backgroundColor: '#aaa'}}
                dotActiveStyle={{backgroundColor: '#007BFF'}}
            />
            <BaseButton
                onPress={handleNextPage}
                style={{
                    marginBottom: 32,
                    marginTop: 40,
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    backgroundColor: '#6A94F9',
                }}>
                <Icon color={'#fff'} name={'chevron-forward-outline'} size={25}/>
            </BaseButton>
        </View>
    );
};
export default OnboardScreen;
