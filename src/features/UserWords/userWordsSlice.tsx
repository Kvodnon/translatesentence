import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Word, State } from "../../app/interfaces";

export const UserWordsSlice = createSlice({
    name: 'userWords',
    initialState: [] as Word[],
    reducers: {
        setUserAnswerList: (_, action: PayloadAction<Word[]>): Word[] => {
            return action.payload;
        }
    }
});

export const selectUserWords = (state: State) => state.userWords;

export const {
    setUserAnswerList
} = UserWordsSlice.actions;

export default UserWordsSlice.reducer;