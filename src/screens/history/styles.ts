import {StyleSheet} from "react-native";
import {AppColors} from "../../shared/constants";
import {marginTopApp} from "../../utils/functions.ts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColor
    },
    appbar: {
        flexDirection: 'row',
        paddingTop: marginTopApp(),
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
export default styles
