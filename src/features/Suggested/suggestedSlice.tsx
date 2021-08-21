import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Word } from "../../app/interfaces";

export const SuggestedSlice = createSlice({
    name: 'suggested',
    initialState: [
        {
            id: 1,
            text: 'She'
        },
        {
            id: 3,
            text: 'eating'
        },
        {
            id: 2,
            text: 'is'
        }
    ] as Word[],
    reducers: {
        setSuggestedWords: (_, action: PayloadAction<Word[]>) => {
            return action.payload;
        }
    }
});

export const {
    setSuggestedWords
} = SuggestedSlice.actions;

export default SuggestedSlice.reducer;