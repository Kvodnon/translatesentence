import { store } from "./store";

export type State = ReturnType<typeof store.getState>

export interface Words {
    suggestedWords: Word[],
    answerWords: Word[],
}

export interface Word {
    id: number,
    text: string,
}

export interface WordProps {
    word: {
        id: number,
        text: string
    },
    index: number
}

export interface KeyAsName {
    [key: string]: {
        list: Word[],
        setList: Function
    }
}

export interface WordsProps {
    words: Word[],
    containerClass: string,
    isDropDisabled?:boolean
}