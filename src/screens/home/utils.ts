import {get} from 'lodash';
import {DateUtil} from "../../utils/functions.ts";

export interface DailyData {
    dailyTotalWater?: number;
    achieved?: boolean;
}

export interface BodyData {
    dailyGoal?: number; // Optional top-level property
    [date: string]: DailyData | number | undefined; // Dynamic date-based keys
}

export interface FormattedBodyData {
    dailyTotalWater?: number; // Optional daily total water
    dailyGoal?: number; // Optional daily goal
}

export interface UpdatedBodyData extends BodyData {
    achievedGoalDays: number;

    [date: string]: {
        dailyTotalWater: number;
        achieved: boolean;
    } | any; // Add fallback type if other dynamic keys are expected
}

export const getFormattedBodyData = (data: BodyData): FormattedBodyData => {
    return {
        dailyTotalWater: get(data, [DateUtil.today(), 'dailyTotalWater']),
        dailyGoal: get(data, 'dailyGoal'),
    };
};
export const getUpdatedAddWaterAmountData = (
    data: BodyData & { achievedGoalDays: number },
    amount: number
): UpdatedBodyData => {
    const today = DateUtil.today(); // Get today's date as a key
    const todayData = data[today];
    const currentDailyTotalWater = typeof todayData === 'object' && todayData !== null
        ? todayData.dailyTotalWater ?? 0
        : 0;
    const isAchieved = typeof todayData === 'object' && todayData !== null
        ? todayData.achieved ?? false
        : false;
    const willAchieve = currentDailyTotalWater + amount >= (data.dailyGoal ?? 0); // Check if goal will be achieved

    return {
        ...data,
        achievedGoalDays:
            !isAchieved && willAchieve
                ? data.achievedGoalDays + 1
                : data.achievedGoalDays,
        [today]: {
            dailyTotalWater: currentDailyTotalWater + amount,
            achieved: willAchieve,
        },
    };
};

export const getUpdatedRemoveWaterAmountData = (
    data: BodyData & { achievedGoalDays: number },
    amount: number
): BodyData & { achievedGoalDays: number } => {
    const today = DateUtil.today(); // Get today's date as a key
    const todayData = data[today]; // Get today's data

    const currentDailyTotalWater =
        typeof todayData === 'object' && todayData !== null
            ? todayData.dailyTotalWater ?? 0
            : 0; // Default to 0 if undefined
    const isAchieved =
        typeof todayData === 'object' && todayData !== null
            ? todayData.achieved ?? false
            : false; // Default to false if undefined
    const willAchieve = currentDailyTotalWater - amount >= (data.dailyGoal ?? 0); // Check if the goal will still be achieved after removing water

    return {
        ...data,
        achievedGoalDays:
            isAchieved && !willAchieve
                ? data.achievedGoalDays - 1
                : data.achievedGoalDays,
        [today]: {
            dailyTotalWater:
                currentDailyTotalWater - amount >= 0
                    ? currentDailyTotalWater - amount
                    : 0, // Ensure the value doesn't go below 0
            achieved: willAchieve,
        },
    };
};
