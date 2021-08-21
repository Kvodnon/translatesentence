import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Word } from "../../app/interfaces";

export const AnswerSlice = createSlice({
    name: 'answer',
    initialState: [] as Word[],
    reducers: {
        setAnswerWords: (_, action: PayloadAction<Word[]>) => {
            return action.payload;
        }
    }
});

export const {
    setAnswerWords
} = AnswerSlice.actions;

export default AnswerSlice.reducer;