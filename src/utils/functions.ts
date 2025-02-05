import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from "moment";

export const marginTopApp = () => {
    let hasNotch = DeviceInfo.hasNotch();
    let hasDynamicIsland = DeviceInfo.hasDynamicIsland();
    if (Platform.OS === 'ios') {
        if (hasDynamicIsland) {
            return 60;
        }
        if (hasNotch) {
            return 45;
        }
        if (!hasNotch) {
            return 30;
        }
    }
    return 12;
};

export class DateUtil {
    static current = () => moment().unix()
    static today = () => moment().format('YYYY/MM/DD')
    static tomorrow = () => moment().add(1, 'days').format('YYYY/MM/DD')
}

export class FormatDateUtils {
    static eeDDMMYYYY = (date: string) => moment(date, "YYYY/MM/DD").format("ddd, DD-MM-YYYY");
}
