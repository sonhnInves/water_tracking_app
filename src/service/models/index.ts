export type ToDoItem = {
    id: number;
    value: string;
};

export interface ImageUser {
    id?: number;
    image?: any;
}

export interface History {
    key: string
    value: HistoryDetail
}

export interface HistoryDetail {
    achieved: boolean
    dailyTotalWater: number
}
