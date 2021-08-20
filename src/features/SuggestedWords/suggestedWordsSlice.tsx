import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Word } from '../../app/interfaces';

export const SuggestedWordsSlice = createSlice({
    name: 'suggestedWords',
    initialState: [
        {
            id: 1,
            text: 'She'
        },
        {
            id: 2,
            text: 'is'
        },
        {
            id: 3,
            text: 'eating'
        }
    ] as Word[],
    reducers: {
        setSuggestedList: (_, action: PayloadAction<Word[]>) => {
            return action.payload;
        }
    }
});

export const {
    setSuggestedList,
} = SuggestedWordsSlice.actions;

export default SuggestedWordsSlice.reducer;