import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../app/store";

interface Word {
    id: number,
    text: string
}

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

export const selectSuggested = (state: State) => state.suggestedWords;

export const {
    setSuggestedList,
} = SuggestedWordsSlice.actions;

export default SuggestedWordsSlice.reducer;