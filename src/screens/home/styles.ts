import {StyleSheet} from 'react-native';
import {AppColors} from "../../shared/constants";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemWater: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.white,
        padding: 4
    },
    flatList: {
        paddingVertical: 40,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    circleButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.white,
    }
});
export default styles;
