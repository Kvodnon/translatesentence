import { store } from "./store";

export type State = ReturnType<typeof store.getState>

export interface Word {
    id: number,
    text: string,
}

export interface KeyAsName {
    [key: string]: {
        list: Word[],
        setList: Function
    }
}

export interface ISuggestedWords {
    isDropDisabled:boolean
}