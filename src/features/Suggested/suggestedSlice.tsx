import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Word } from "../../app/interfaces";

export const SuggestedSlice = createSlice({
    name: 'suggested',
    initialState: [
        {
            id: 2,
            text: 'like'
        },
        {
            id: 7,
            text: "don't"
        },
        {
            id: 4,
            text: 'but'
        },
        {
            id: 3,
            text: 'hockey'
        },
        {
            id: 8,
            text: 'favorite'
        },
        {
            id: 10,
            text: 'I'
        },
        {
            id: 1,
            text: 'I'
        },
        {
            id: 6,
            text: 'have'
        },
        {
            id: 9,
            text: 'team'
        },
        {
            id: 5,
            text: 'a'
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